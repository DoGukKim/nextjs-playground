import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

interface UseFormStateReturn<T> {
  values: T;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  setValues: Dispatch<SetStateAction<T>>;
  reset: () => void;
}

const useFormState = <T extends object>(
  initialState: T
): UseFormStateReturn<T> => {
  const [values, setValues] = useState<T>(initialState);
  const initialStateRef = useRef<T>(initialState);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value, type } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    []
  );

  const reset = useCallback(() => {
    setValues(initialStateRef.current);
  }, []);

  return {
    values,
    handleChange,
    setValues,
    reset,
  };
};

export default useFormState;
