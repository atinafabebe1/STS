import { ButtonProps } from '@mui/material';
import CustomForm from '../../components/form/CustomForm'
import usePostHook from '../../hooks/usePostHook';
import { BASE_URL } from '../../api/api';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'dropdown' | 'number' | 'date';
  options?: string[]; 
}

interface ButtonConfig extends Omit<ButtonProps, 'onClick'> {
  label: string;
  onClick?: (formData: Record<string, string>) => void;
}

const AddNewStudent = () => {
  
  const { isLoading, error, handleSubmit,successMessage } = usePostHook(`${BASE_URL}/students`);

  const formFields:Field[] = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'stream', label: 'Stream Type', type: 'dropdown', options: ['General', 'Natural-Science', 'Social-Science'] },
    { name: 'gradeLevel', label: 'Grade Level', type: 'dropdown', options: ["9",'10','11','12'] },
    { name: 'section', label: 'Section', type: 'text' },
    { name: 'idNumber', label: 'ID Number', type: 'text' },
    { name: 'gender', label: 'Gender', type: 'dropdown', options: ['M', 'F'] },
    { name: 'dateOfAdmission', label: 'Date of Admission', type: 'date' },
    { name: 'dateOfLeaving', label: 'Date of Leaving', type: 'date' },
  ];

  const formButtons: ButtonConfig[] = [
    { label: 'Submit', onClick: () => console.log('Submit button clicked') },
    { label: 'Cancel', onClick: () => console.log('Cancel button clicked') },
  ];

  return (
    <div>
      <h2>Student Information Form</h2>
      <CustomForm onSubmit={handleSubmit} fields={formFields} buttons={formButtons} isLoading={isLoading} error={error} successMessage={successMessage}/>
    </div>
  );
};

export default AddNewStudent;
