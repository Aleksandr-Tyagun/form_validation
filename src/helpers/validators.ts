export const required = (value: string) => {
  if (!value) {
    return 'This field in required';
  }

  return '';
}

export const range = (value: string, range: InputRange) => {
  if (value && (+value < range.min || +value > range.max)) {
    return `Please enter number from ${range.min} to ${range.max}`;
  }

  return '';
}