import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnType<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialData: T): ReturnType => {
  const [state, setState] = useState(initialData);
  const handler = useCallback((e: any) => {
    setState(e.target.value);
  }, []);

  return [state, handler, setState];
};

export default useInput;
