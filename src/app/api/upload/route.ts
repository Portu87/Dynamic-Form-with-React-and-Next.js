import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
} from "@/config/config";


cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});


export async function POST(req: any) {
  const data = await req.formData();
  const file = data.get("file");
 
  if (!file) {
    return NextResponse.json("error sin imagen", { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      })
      .end(buffer);
  });

  const fileSplit = file.name.split(".");
  const fileNameWithoutExtension = fileSplit[0];

  const fileName = `${Date.now()}-${file.name}`;
  return NextResponse.json({
    name: fileName,
    originalName: fileNameWithoutExtension,
    url: response.secure_url,
    width: response.width,
    height: response.height,
    format: response.format,
    bytes: response.bytes,
  });
}
