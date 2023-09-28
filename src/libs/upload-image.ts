/**
 * `UploadImg` is a function for uploading an image to the Cloudinary cloud storage service.
 *
 * @param {File | null} file - The image file to be uploaded.
 * @param {string} by - A prefix to be added to the uploaded image's name (optional).
 * @returns {Promise<Object>} - An object containing information about the uploaded image.
 * @throws {Error} - Throws an error if there's an issue with the image upload.
 */

import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } from "@/config/config";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: CLOUDINARY_NAME, 
  api_key: CLOUDINARY_KEY, 
  api_secret: CLOUDINARY_SECRET 
});

export async function UploadImg (file: File | null, by: string = 'default') {
    try {
        if (!file) {
            throw new Error('No image provided');
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            }).end(buffer);
        });

        const fileSplit = file.name.split(".");
        const fileNameWithoutExtension = fileSplit[0];

        const fileName = `${by}-${Date.now()}-${file.name}`;

        return {
            name: fileName,
            originalName: fileNameWithoutExtension, 
            url: response.secure_url,
            width: response.width,
            height: response.height,
            format: response.format,
            bytes: response.bytes,
        };
    } catch (error) {
        throw new Error(`Error uploading image`);
    }
}
