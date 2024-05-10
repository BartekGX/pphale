"use client";
import { useCallback } from "react";
import { useDropzone } from 'react-dropzone';
export default function Photodropzone({ onImageDrop, type }) {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            onImageDrop(acceptedFiles);
        }
    }, [onImageDrop]);

    let dropzoneOptions = {
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                onImageDrop(acceptedFiles);
            }
        },
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
        },
        maxFiles: 1,
    };
    if (type === 'slider') {
        dropzoneOptions.maxFiles = 60;
    } else if (type === 'files') {
        dropzoneOptions.accept = {
            'application/zip': ['.zip'],
            'application/msword': ['.doc', '.docx'],
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg', '.jpeg']
        };
    }


    const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);
    return (
        <div {...getRootProps()} className="text-custom-gray-500 border-2 border-custom-gray-500 border-dashed cursor-pointer w-full text-center rounded-md p-5">
            <input {...getInputProps()} />
            <p>Przeciągnij i upuść zdjęcie lub kliknij, aby wybrać.</p>
        </div>
    )
}