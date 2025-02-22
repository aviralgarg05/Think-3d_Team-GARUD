# **Think-3D Team GARUD 🚀**
_A powerful AI-driven Image-to-3D Model conversion system._

## 📌 **Overview**
Think-3D Team GARUD is an AI-powered **Image-to-3D model generator** that takes a **2D image** as input and produces a **high-quality 3D model** using **Stability AI's TripoSR** and **Google Gemini AI** for image analysis.

This project leverages:
- **TripoSR** for 3D model reconstruction 🏗️
- **Gemini AI** for **image understanding** 📷
- **PyTorch & TorchMCubes** for mesh extraction 🎨
- **OpenCV & Rembg** for background removal 🚀

---

## 🚀 **Features**
✅ **Upload an image** & get a **realistic 3D model**  
✅ **AI-powered image analysis** with **Google Gemini**  
✅ **Automatic background removal** for cleaner results  
✅ **Fast and efficient** deep learning-based 3D conversion  
✅ **Exports in `.obj` format** for compatibility with Blender, Unity, and Unreal Engine  

---

## 🏗 **Installation Guide**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/aviralgarg05/Think-3d_Team-GARUD.git
cd Think-3d_Team-GARUD
```

### **2️⃣ Create & Activate Virtual Environment**
```bash
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

### **3️⃣ Install Dependencies**
```bash
pip install --upgrade pip setuptools wheel cmake ninja
pip install -r requirements.txt
```

### **4️⃣ Install PyTorch (If Not Installed)**
For CUDA (GPU support):
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```
For CPU-only:
```bash
pip install torch torchvision torchaudio
```

### **5️⃣ Install TorchMCubes**
```bash
pip install --no-cache-dir git+https://github.com/tatsy/torchmcubes.git
```

---

## 🎮 **Usage**
### **Run the Script**
```bash
python generate_3d.py
```
Then enter the **image file path** when prompted.

OR, directly specify the image:
```bash
echo "/path/to/image.png" | python generate_3d.py
```

### **Output**
✅ **3D Model saved as `.obj` file**  
✅ **Image description using Google Gemini**  
✅ **Processed image with background removal**


## 🔧 **Troubleshooting**
### **1️⃣ TorchMCubes Installation Issues**
If `torchmcubes` fails to install, ensure:
```bash
pip install --no-cache-dir torchmcubes
```
And check if PyTorch is installed:
```bash
python -c "import torch; print(torch.__version__)"
```

### **2️⃣ CUDA Issues**
If GPU acceleration isn't working, **force CPU mode**:
```bash
export CUDA_VISIBLE_DEVICES=""
```
Then run the script again.

---

## 🔗 **Resources**
- 🔹 [TripoSR by Stability AI](https://github.com/Stability-AI/TripoSR)
- 🔹 [TorchMCubes](https://github.com/tatsy/torchmcubes)
- 🔹 [Google Gemini AI](https://ai.google.dev/)

---

## 👨‍💻 **Contributors**
🚀 **Think-3D Team GARUD**  
📌 Created by **Team GARUD**  
💡 Open to **collaborations & improvements!**  

Feel free to fork, contribute, and raise issues! 🎨🔥

---

## 📜 **License**
This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it **with attribution**.  

---

## ⭐ **Support the Project**
If you find this useful, give us a ⭐ on GitHub! 🚀  
For suggestions, reach out via Issues or Pull Requests.

---
Would you like to add any **logos, links, or badges**? Let me know! 🚀
