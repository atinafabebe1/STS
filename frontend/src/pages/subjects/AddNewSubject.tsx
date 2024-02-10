
import { ButtonProps } from '@mui/material';
import CustomForm from '../../components/form/CustomForm';
import usePostHook from '../../hooks/usePostHook';
import { BASE_URL } from '../../api/api';
import ViewSubjects from './ViewSubjects';

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


const AddNewSubject = () => {
  const { isLoading, error, handleSubmit } = usePostHook(`${BASE_URL}/subjects`);

  const formFields:Field[] = [
    { name: 'name', label: 'Subject Name', type: 'text' },
  ];

  const formButtons:ButtonConfig[] = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { label: 'Submit', onClick: (formData: any) => handleSubmit(formData) },
    { label: 'Cancel', onClick: () => console.log('Cancel button clicked') },
  ];

  return (
    <div>
      <div style={{padding:"16px"}}>
          <h2>Enter Subject Name</h2>
          <CustomForm onSubmit={handleSubmit} fields={formFields} buttons={formButtons} isLoading={isLoading} error={error} />
      </div>

      <div style={{marginTop:"30px"}}>

      <ViewSubjects/>
      </div>
    </div>
  );
};

export default AddNewSubject;
