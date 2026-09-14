import { useState } from "react"
import type { UploadStatus } from "../types"

// this is a custom hook that manages the state of the upload process
export function useHeadshot() {

    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleUploadStart = () => {
        setUploadStatus('uploading');
        setUploadError(null);
    }

    const handleUploadError = (error: Error) => {
        setUploadStatus('error');
        setUploadError(error.message);
    }


    return {
        uploadStatus,
        uploadError,
        handleUploadStart,
        handleUploadError
    }
}