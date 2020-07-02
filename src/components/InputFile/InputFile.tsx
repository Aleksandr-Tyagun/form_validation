import React, { useState } from 'react';

import './InputFile.scss';

type Props = {
  handleInputFile: (uploadedFiles: FileList) => void;
}

export const InputFile: React.FC<Props> = ({ handleInputFile }) => {
  const [files, setFiles] = useState<FileList>();

  const handleInputChange = (uploadedFiles: FileList | null) => {
    if (uploadedFiles?.length) {
      setFiles(uploadedFiles);
      handleInputFile(uploadedFiles);
    }
  }
  return (
    <div className="InputFile">
      <label className="InputFile__Label" htmlFor="upload">
        <span className="InputFile__Title">
          Add file as attachment
        </span>
        <span className="InputFile__FilesAttached">
          {files?.length && `${files?.length} files attached`}
        </span>
      </label>
      <input
        className="InputFile__Button"
        tabIndex={-1}
        type="file"
        id="upload"
        multiple
        onChange={e => handleInputChange(e.currentTarget.files)}
      />
    </div>
  );
}
