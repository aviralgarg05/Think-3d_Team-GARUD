"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle file selection
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];

    if (uploadedFile.type !== "image/png") {
      setError("Only PNG files are allowed.");
      return;
    }

    setFile(uploadedFile);
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"] },
    multiple: false,
  });

  // Upload file and download response
  const handleUpload = async () => {
    if (!file) {
      alert("No file selected.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError("Error processing file.");
        return;
      }

      // Auto-download the returned OBJ file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "model.obj";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {/* Drag & Drop Box */}
      <div
        {...getRootProps()}
        className={`w-96 h-40 border-2 border-dashed p-4 flex flex-col items-center justify-center cursor-pointer ${
          isDragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-indigo-600">Drop the file here...</p>
        ) : (
          <p className="text-gray-600">
            Drag & drop a PNG file, or click to browse
          </p>
        )}
      </div>

      {file && <p className="text-green-600">Selected File: {file.name}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md"
      >
        {loading ? "Uploading..." : "Upload & Process"}
      </button>
    </div>
  );
}
