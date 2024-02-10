
import { ButtonProps } from '@mui/material';
import CustomForm from '../../components/form/CustomForm';
import usePostHook from '../../hooks/usePostHook';
import { BASE_URL } from '../../api/api';
import ViewStreams from './ViewStreams';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'dropdown';
  options?: string[]; 
}

interface ButtonConfig extends Omit<ButtonProps, 'onClick'> {
  label: string;
  onClick?: (formData: Record<string, string>) => void;
}


const AddNewStream = () => {
  const { isLoading, error, handleSubmit } = usePostHook(`${BASE_URL}/streams`);

  const formFields:Field[] = [
    { name: 'name', label: 'Stream Type', type: 'dropdown', options: ['General', 'Natural-Science', 'Social-Science'] },
  ];

  const formButtons:ButtonConfig[] = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { label: 'Submit', onClick: (formData: any) => handleSubmit(formData) },
    { label: 'Cancel', onClick: () => console.log('Cancel button clicked') },
  ];

  return (
    <div>
      <div style={{padding:"16px"}}>
          <h2>Enter Stream Name</h2>
          <CustomForm onSubmit={handleSubmit} fields={formFields} buttons={formButtons} isLoading={isLoading} error={error} />
      </div>
      <div  style={{marginTop:"30px"}}>

      <ViewStreams/>
      </div>
    </div>
  );
};

export default AddNewStream;
