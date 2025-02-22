import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || file.type !== "image/png") {
      return NextResponse.json(
        { error: "Only PNG files are allowed" },
        { status: 400 }
      );
    }

    // Send file to Flask API
    const flaskResponse = await fetch("http://127.0.0.1:5000/process", {
      method: "POST",
      body: formData,
    });

    if (!flaskResponse.ok) {
      return NextResponse.json(
        { error: "Failed to process file" },
        { status: 500 }
      );
    }

    // Convert Flask response to Blob (OBJ file)
    const blob = await flaskResponse.blob();

    return new Response(blob, {
      headers: {
        "Content-Disposition": 'attachment; filename="model.obj"',
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
