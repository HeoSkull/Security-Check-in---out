export type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  style: any;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
};

export const handleChangeText = (setFn: Function) => {
  return (e: any) => setFn(e);
};
