import { ButtonProps, Typography } from '@mui/material';
import CustomForm from '../../components/form/CustomForm';
import usePostHook from '../../hooks/usePostHook';
import { BASE_URL } from '../../api/api';
import ViewStreamSubjects from './ViewStreamSubjects';
import useFetch from '../../hooks/useFetchHook';
import { useEffect } from 'react';
import colorConfigs from '../../configs/colorConfigs';

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

const AddSubjectToStream = () => {
  const { isLoading, error, handleSubmit } = usePostHook(`${BASE_URL}/streams/addSubjectToStream`);
  const { data } = useFetch({ url: `${BASE_URL}/subjects` });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const subjectNames = data ? data.map((subject: { name: string }) => subject.name) : [];

  const formFields: Field[] = [{ name: 'name', label: 'Subject', type: 'dropdown', options: subjectNames }];

  const formButtons: ButtonConfig[] = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { label: 'Submit', onClick: (formData: any) => handleSubmit(formData) },
    { label: 'Clear', onClick: () => console.log('Cancel button clicked') }
  ];

  return (
    <div>
      <div style={{ padding: '16px' }}>

        <Typography variant="h4" gutterBottom style={{ color: colorConfigs.text }}>
          Choose Subject
        </Typography>

        <CustomForm onSubmit={handleSubmit} fields={formFields} buttons={formButtons} isLoading={isLoading} error={error} />
      </div>

      <div style={{ marginTop: '30px' }}>
        <ViewStreamSubjects />
      </div>
    </div>
  );
};

export default AddSubjectToStream;
