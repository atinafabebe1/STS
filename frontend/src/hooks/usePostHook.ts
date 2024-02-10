import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRefreshContext } from '../context/RefreshHook';

interface FormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const usePostHook = (url: string) => {
  const {handleRefresh} = useRefreshContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');


  const handleSubmit = async (formData: FormData) => {
    console.log("formData")
    console.log(formData)
    setIsLoading(true);
    try {
      const response = await axios.post(url, formData).then(()=>{
        setSuccessMessage('Succesfully Submited')
      });
      
      handleRefresh()
      console.log(successMessage)
      console.log('Data submitted successfully', response);
    } catch (error) {
      console.log(error)
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSubmit ,successMessage};
};

export default usePostHook;
