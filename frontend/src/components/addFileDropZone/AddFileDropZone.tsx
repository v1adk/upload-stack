import { ReactElement, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

interface AddPictureDropZoneProps {}

function AddPictureDropZone({}: AddPictureDropZoneProps): ReactElement {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleOnDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles == null || acceptedFiles.length === 0) {
            console.log("No file selected");
            setErrorMessage("No files selected");
        } else {
            try {
                const formData = new FormData();
                acceptedFiles.forEach((acceptedFile) =>
                    formData.append("files", acceptedFile)
                );
                await axios.post("http://localhost:8000/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                console.error(error);
                setErrorMessage("File upload failed.");
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleOnDrop,
        //accept: "image/*",
    });

    return (
        <div {...getRootProps()} className="Upload-area">
            <input {...getInputProps()} />
            {isDragActive ? <span>Drop here</span> : <span>Upload file</span>}
        </div>
    );
}

export default AddPictureDropZone;
