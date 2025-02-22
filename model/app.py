from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  # Enable CORS
import os
import torch
import numpy as np
from PIL import Image
import rembg
import tempfile
from tsr.system import TSR
from tsr.utils import remove_background, resize_foreground

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load the model
device = "cuda:0" if torch.cuda.is_available() else "cpu"
model = TSR.from_pretrained("stabilityai/TripoSR", config_name="config.yaml", weight_name="model.ckpt")
model.to(device)

def process_image(image_path):
    image = Image.open(image_path).convert("RGB")
    rembg_session = rembg.new_session()
    image = remove_background(image, rembg_session)
    image = resize_foreground(image, 0.85)
    return image

@app.route("/generate-3d", methods=["POST"])
def generate_3d():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]
        temp_input = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
        file.save(temp_input.name)

        image = process_image(temp_input.name)

        with torch.no_grad():
            scene_codes = model([image], device=device)

        meshes = model.extract_mesh(scene_codes, has_vertex_color=True, resolution=256)
        temp_output = tempfile.NamedTemporaryFile(delete=False, suffix=".obj")
        meshes[0].export(temp_output.name)

        return send_file(temp_output.name, as_attachment=True, download_name="3d_model.obj")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
