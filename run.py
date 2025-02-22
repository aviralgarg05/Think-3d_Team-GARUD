import os
import logging
import tempfile
import torch
import numpy as np
import openai
import base64
from PIL import Image
import rembg

from tsr.system import TSR
from tsr.utils import remove_background, resize_foreground

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load the model
device = "cuda:0" if torch.cuda.is_available() else "cpu"
model = TSR.from_pretrained("stabilityai/TripoSR", config_name="config.yaml", weight_name="model.ckpt")
model.to(device)

# **Secure OpenAI API Key Handling**
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Use an environment variable

if not OPENAI_API_KEY:
    raise ValueError("⚠️ OpenAI API key is missing! Set the OPENAI_API_KEY environment variable.")

openai.api_key = OPENAI_API_KEY

# Helper function to process image
def process_image(image_path, remove_bg=True, foreground_ratio=0.85):
    image = Image.open(image_path).convert("RGB")
    if remove_bg:
        rembg_session = rembg.new_session()
        image = remove_background(image, rembg_session)
        image = resize_foreground(image, foreground_ratio)
        image = np.array(image).astype(np.float32) / 255.0
        image = image[:, :, :3] * image[:, :, 3:4] + (1 - image[:, :, 3:4]) * 0.5
        image = Image.fromarray((image * 255.0).astype(np.uint8))
    return image

# **Fix: Use `image_url` as an Object**
def get_image_description(image_path):
    try:
        # Open and resize the image for better accuracy
        image = Image.open(image_path)
        image = image.resize((256, 256))  # Preserve details

        # Convert image to Base64-encoded string
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as temp_file:
            image.save(temp_file.name, format="PNG")
            temp_image_path = temp_file.name

        with open(temp_image_path, "rb") as img_file:
            base64_image = base64.b64encode(img_file.read()).decode("utf-8")

        # Correct OpenAI API request format (Wrap `image_url` as an object)
        response = openai.ChatCompletion.create(
            model="gpt-4-turbo-2024-04-09",  # Newest model
            messages=[
                {"role": "system", "content": "You are an AI that accurately describes images."},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Describe this image. Identify objects, colors, and details."},
                        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{base64_image}"}}  # Fixed: Wrap as an object
                    ]
                }
            ],
            max_tokens=150  # Allow full descriptions
        )

        return response["choices"][0]["message"]["content"].strip()

    except openai.error.OpenAIError as e:
        logging.error(f"⚠️ OpenAI API error: {str(e)}")
        return "Error generating image description."

# Main function to process an image file
def generate_3d_model(image_path):
    try:
        # Ensure the image file exists
        if not os.path.exists(image_path):
            print("❌ Error: File not found!")
            return None, "No image provided."

        # Process the image
        print("🔹 Processing image...")
        image = process_image(image_path, remove_bg=True)

        # Get Image Description from OpenAI GPT
        print("🔹 Getting accurate image description using GPT-4-Turbo...")
        description = get_image_description(image_path)
        print(f"🔸 Image Description: {description}")

        # Run the model
        print("🔹 Generating 3D model... (This may take some time)")
        with torch.no_grad():
            scene_codes = model([image], device=device)

        # Extract the mesh
        meshes = model.extract_mesh(scene_codes, has_vertex_color=True, resolution=256)

        # Save the mesh file with a readable filename
        output_filename = os.path.join(tempfile.gettempdir(), "generated_3D_model.obj")
        meshes[0].export(output_filename)

        print(f"✅ 3D model successfully saved: {output_filename}")

        return output_filename, description

    except Exception as e:
        logging.error(f"❌ Error generating 3D model: {str(e)}")
        print(f"❌ Error: {str(e)}")
        return None, "Error generating model."

# Run the script with an image file
if __name__ == "__main__":
    input_image = input("📸 Enter the path of the image file: ").strip()
    
    model_path, img_description = generate_3d_model(input_image)

    if model_path:
        print("\n🎨 **Final Results:**")
        print(f"🔹 3D Model File: {model_path}")
        print(f"🔹 Image Description: {img_description}")
    else:
        print("⚠️ Failed to generate the 3D model.")
