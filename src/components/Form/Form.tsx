import React, { useState } from 'react';

import './Form.scss';
import { FormField } from '../FormField';
import { InputFile } from '../InputFile';
import { required, range } from '../../helpers/validators';

const fieldsConfigs: FormField[] = [
  {
    name: 'companyName',
    type: 'text',
    label: 'Your company name',
    placeholder: 'Type text',
  },
  {
    name: 'numberOfPeople',
    type: 'number',
    placeholder: '1-99',
    label: 'Number of people',
    range: { min: 1, max: 99 },
    validators: [required, range]
  },
  {
    name: 'companyArea',
    type: 'text',
    label: 'Your company name',
    placeholder: 'Design, Marketing, Development, etc.',
    validators: [required]
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    placeholder: 'Type text',
    textarea: true,
    validators: [required]
  },
];

const defaultValues: FormValues = {
  companyName: '',
  numberOfPeople: '',
  companyArea: '',
  description: '',
};

const emptyErrors: FormErrors = {
  companyName: '',
  numberOfPeople: '',
  companyArea: '',
  description: '',
};

export const Form = () => {
  const [form, setForm] = useState({
    values: defaultValues,
    errors: emptyErrors,
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const handleChange = (
    { target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      values: {
        ...form.values,
        [name]: value,
      },
      errors: {
        ...form.errors,
        [name]: '',
      },
    });
  };

  const handleBlur = (
    { target: { name } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const errorMessage = validateField(name);

    if (errorMessage) {
      setForm({
        values: {
          ...form.values,
        },
        errors: {
          ...form.errors,
          [name]: errorMessage,
        }
      });
    }
  }

  const validateField = (name: string) => {
    const field = fieldsConfigs.find(config => config.name === name);

    if (field && field.validators) {
      const fieldErrors = field.validators.map(validator => {
        return validator(form.values[name], field.range);
      });

      return fieldErrors.filter(Boolean).join(', ');
    }

    return '';
  }

  const handleInputFile = (uploadedFiles: FileList | null) => {
    if (uploadedFiles?.length) {
      setFiles(uploadedFiles)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = { ...emptyErrors };
    let isValid = true;

    fieldsConfigs.forEach(({ name, range, validators = [] }) => {
      const fieldErrors = validators.map(validator => {
        return validator(form.values[name], range)
      })

      newErrors[name] = fieldErrors.filter(Boolean).join(', ')

      if (newErrors[name]) {
        isValid = false;
      }
    });

    if (!isValid) {
      setForm({
        values: { ...form.values },
        errors: newErrors,
      });

      return;
    }

    console.log('Submitted data:', form.values)
    console.log('Submitted files:', files === null ? 'No files were attached' : files)

    setForm({
      values: defaultValues,
      errors: emptyErrors,
    });

    setFiles(null);

  };

  return (
    <form
      className="Form"
      onSubmit={(e) => handleSubmit(e)}
    >
      {fieldsConfigs.map(
        ({
          name,
          label,
          range,
          placeholder,
          type,
          textarea,
          validators
        }) => (
            <FormField
              key={name}
              name={name}
              type={type}
              label={label}
              range={range}
              placeholder={placeholder}
              value={form.values[name]}
              textarea={textarea}
              validators={validators}
              errorMessage={form.errors[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )
      )}
      <InputFile handleInputFile={handleInputFile} files={files} />
      <button
        className="Form__Sumbit"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

