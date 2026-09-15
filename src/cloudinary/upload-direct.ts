import type { CloudinaryUploadResult } from "./UploadWidget";


// This function uploads an image to Cloudinary using a direct upload approach with XMLHttpRequest. 
// It takes a File object and an optional onProgress callback to track the upload progress. 
// The function returns a Promise that resolves with the CloudinaryUploadResult or rejects with an error message if the upload fails.
export async function UploadImageToCloudinary(
    file: File,
    onProgress?: (percent: number) => void
): Promise<CloudinaryUploadResult> {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable && onProgress) {
                onProgress(Math.round((event.loaded / event.total) * 100));
            }
        });

        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(JSON.parse(xhr.responseText) as CloudinaryUploadResult);
                } catch {
                    reject(new Error("Invalid response from Cloudinary"));
                }
                return;
            }
            try {
                const body = JSON.parse(xhr.responseText) as {
                    error?: { message?: string };
                };
                reject(
                    new Error(body.error?.message ?? `Upload failed (${xhr.status})`),
                );
            } catch {
                reject(new Error(`Upload failed (${xhr.status})`));
            }
        })


        xhr.addEventListener("error", () => {
            reject(new Error("Upload failed. Check your connection"));
        })


        xhr.addEventListener("abort", () => {
            reject(new Error("Uploafd cancelled"));
        })

        xhr.open(
            "POST",
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        )

        xhr.send(formData);
    })
}