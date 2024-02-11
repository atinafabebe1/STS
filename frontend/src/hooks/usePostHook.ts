/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRefreshContext } from '../context/RefreshHook';

interface FormData {
  [key: string]: any;
}

const usePostHook = (url: string) => {
  const { handleRefresh } = useRefreshContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.post(url, formData);
      console.log(response);
      handleRefresh();
      setSuccessMessage('Successfully Submitted');
      setError('');
    } catch (error: any) { // Explicitly define error as AxiosError
      console.log(error.response?.data?.error);
      setSuccessMessage('');
      if (error.response?.data?.error) {
        setError(error.response?.data?.error || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSubmit, successMessage };
};

export default usePostHook;
