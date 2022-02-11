import { ReactElement, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getFileExtension } from "../../utils/getFileExtension";
import axios from "axios";

interface AddPictureDropZoneProps {}

function AddPictureDropZone({}: AddPictureDropZoneProps): ReactElement {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleOnDrop = (acceptedFiles: File[]) => {
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
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleOnDrop,
        //accept: "image/*",
    });

    return (
        <div
            {...getRootProps()}
            style={{
                minHeight: "50vh",
                minWidth: "50%",
                borderWidth: "2px",
                border: "dashed",
                borderColor: "white",
                borderRadius: "50px",
                alignItems: "center",
                justifyContent: "center",
                caretColor: "transparent",
                display: "flex",
            }}
        >
            <input {...getInputProps()} />
            {"Upload File"}
        </div>
    );
}

export default AddPictureDropZone;
