import { ButtonProps, Container, Paper, Typography } from '@mui/material';
import usePostHook from '../../hooks/usePostHook';
import CustomForm from '../../components/form/CustomForm'
import useFetch from '../../hooks/useFetchHook';
import { useParams } from 'react-router-dom';
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

const AddGrade = () => {
  const {studentId}  =useParams()
  const { data, loading } = useFetch({ url: `${BASE_URL}/student?_id=${studentId}` });


  const { isLoading, error, handleSubmit, successMessage } = usePostHook('/api/createGrade');

  const fields: Field[] = [
    { name: 'semester', label: 'Semester', type: 'dropdown',options:["I","II"] },
    { name: 'academicYear', label: 'Academic Year', type: 'text' },
    { name: 'mark', label: 'Mark', type: 'text' },
  ];

  const buttons: ButtonConfig[] = [
    { label: 'Submit', onClick: handleSubmit },
  ];

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Add Grades
        </Typography>

        <CustomForm
          onSubmit={handleSubmit}
          fields={fields}
          buttons={buttons}
          isLoading={isLoading}
          error={error}
          successMessage={successMessage}
        />
      </Paper>
    </Container>
  );
};

export default AddGrade;
