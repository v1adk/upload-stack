import { ReactElement, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

interface AddPictureDropZoneProps {}

function AddPictureDropZone({}: AddPictureDropZoneProps): ReactElement {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleOnDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles == null || acceptedFiles.length === 0) {
            console.log("No file selected");
        } else {
            const file = acceptedFiles[0]; // always select the first file

            if (file == null) {
                console.error("Selected file is null.");
                setErrorMessage("Selected file is missing. Please try again.");
                return;
            }

            axios.post("upload_file", file, {
                headers: {
                    "Content-Type": file.type,
                },
            });
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
