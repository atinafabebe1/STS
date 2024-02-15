import { ButtonProps } from '@mui/material';
import CustomForm from '../../components/form/CustomForm';
import usePostHook from '../../hooks/usePostHook';
import { BASE_URL } from '../../api/api';
import ViewClasses from './ViewClasses';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'dropdown';
  options?: string[]; 
}

interface ButtonConfig extends Omit<ButtonProps, 'onClick'> {
  label: string;
  onClick?: (formData: Record<string, string | string[]>) => void;
}

const AddNewClasses = () => {
  const { isLoading, error, handleSubmit, successMessage } = usePostHook(`${BASE_URL}/classes`);

  const formFields: Field[] = [
    { name: 'gradeLevel', label: 'Grade Level', type: 'dropdown', options: ['9', '10', '11', '12', '13'] },
    { name: 'sectionsRange', label: 'Sections Range (e.g., A-M)', type: 'text' },
  ];

  const formButtons: ButtonConfig[] = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { label: 'Submit', onClick: (formData: any) => handleSubmit(formData) },
    { label: 'Cancel', onClick: () => console.log('Cancel button clicked') },
  ];

 
  return (
    <div>
      <div style={{ padding: "16px" }}>
        <h2>Enter Classroom Information</h2>
        <CustomForm onSubmit={handleSubmit} fields={formFields} buttons={formButtons} isLoading={isLoading} error={error} successMessage={successMessage} />
      </div>

      <div style={{ marginTop: "30px" }}>
        <ViewClasses />
      </div>
    </div>
  );
};

export default AddNewClasses;
