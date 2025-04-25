"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { FunctionComponent, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader: FunctionComponent<FileUploaderProps> = ({
  files,
  onChange,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = (index: number) => {
    if (files) {
      const updatedFiles = files.filter((_, i) => i !== index);
      onChange(updatedFiles);
    }
  };

  return (
    <div {...getRootProps()} className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-primary p-5">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        files.map((file, index) => (
          <div key={index} className="flex flex-col gap-2 items-center">
            <Image
              src={convertFileToUrl(file)}
              width={1000}
              height={1000}
              alt="uploaded image"
              className="max-h-[200px] overflow-hidden object-cover rounded-md"
            />
            <Button
              onClick={() => handleRemoveFile(index)}
              className="ml-2  hover:underline"
            >
              Remove
            </Button>
          </div>
        ))
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            height={40}
            width={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
