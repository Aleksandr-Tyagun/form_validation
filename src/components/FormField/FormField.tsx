import React from 'react';
import classNames from 'classnames';

import './FormField.scss';

export const FormField: React.FC<FormField> = ({
  type,
  label,
  name,
  placeholder,
  value,
  textarea,
  errorMessage,
  validators,
  onChange,
  onBlur,
}) => {

  const gridAreaName = (name: string) => {
    return name[0].toUpperCase() + name.substr(1);
  }

  let inputAttr = {
    className: classNames(
      'FormField__Input',
      { 'FormField__Input--Error': errorMessage },
      { 'FormField__Input--TextArea': textarea },
    ),
    name: String(name),
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    autoComplete: 'off'
  }

  if (textarea) {
    delete inputAttr.type;
  }

  return (
    <div className={`FormField FormField--${gridAreaName(String(name))}`}>
      <label
        className="FormField__Label"
        htmlFor={String(name)}
      >
        {label}
        {(validators || []).length !== 0 && (
          <span className="FormField__Required">*</span>
        )}
      </label>
      <div className="FormField__InputArea">
        {textarea ? (
          <textarea {...inputAttr} />
        ) : (
          <input {...inputAttr} />
        )}
      </div>
      {errorMessage && (
        <p className="FormField__ErrorMessage">
          {errorMessage}
        </p>
      )}

    </div>
  );
}
