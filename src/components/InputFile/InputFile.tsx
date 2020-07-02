import React from 'react';

import './InputFile.scss';

type Props = {
  handleInputFile: (uploadedFiles: FileList | null) => void;
  files: FileList | null;
}

export const InputFile: React.FC<Props> = ({ handleInputFile, files }) => {
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
        onChange={({ target: { files }}) => files && handleInputFile(files)}
      />
    </div>
  );
}
