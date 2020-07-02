/// <reference types="react-scripts" />

interface FormErrors {
  [key: string]: string;
}

interface FormValues {
  [key: string]: string;
}
interface InputRange {
  min: number;
  max: number;
}
interface FormField {
  name: keyof FormValues,
  type: string,
  label: string,
  placeholder: string,
  value?: string;
  errorMessage?: string;
  range?: InputRange,
  textarea?: boolean,
  min?: string,
  validators?: Array<Function>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

