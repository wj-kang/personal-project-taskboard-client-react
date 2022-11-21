import { useState } from 'react';

export interface UseInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  initValue: () => void;
}

export function useInput(initialValue: string, validator?: (value: string) => boolean): UseInputProps {
  const [value, setValue] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;

    // if it gets a validator function as a second argument, validate the value onChange
    if (validator) {
      setIsValid(validator(value));
    }
    setValue(value);
  };

  const initValue = () => {
    setValue(initialValue);
    setIsValid(false);
  };

  return { value, onChange, isValid, setIsValid, initValue };
}
