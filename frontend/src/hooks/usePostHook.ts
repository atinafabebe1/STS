import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useSchoolContext } from '../context/SchoolAdded';

interface FormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const usePostHook = (url: string) => {
  const {handleRefresh} = useSchoolContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);


  const handleSubmit = async (formData: FormData) => {
    console.log(formData)
    setIsLoading(true);
    try {
      const response = await axios.post(url, formData);
      handleRefresh()
      // Handle response if needed
      console.log('Data submitted successfully', response.data);
    } catch (error) {
      console.log(error)
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSubmit };
};

export default usePostHook;
