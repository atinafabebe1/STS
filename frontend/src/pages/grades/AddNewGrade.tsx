/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonProps, Container, TextField, Typography } from '@mui/material';
import usePostHook from '../../hooks/usePostHook';
import CustomForm from '../../components/form/CustomForm';
import useFetch from '../../hooks/useFetchHook';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../api/api';
import { SetStateAction, useEffect, useState } from 'react';
import colorConfigs from '../../configs/colorConfigs';
import axios from 'axios';
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
  const { studentId } = useParams();
  const { data } = useFetch({ url: `${BASE_URL}/students?_id=${studentId}` });
  const { data: academicYears } = useFetch({ url: `${BASE_URL}/academicYears` });
  const [acadmicYearOptions, setAcademicYearsOptions] = useState<string[]>([]);
  const { isLoading, error, handleSubmit, successMessage } = usePostHook(`${BASE_URL}/grades`);

  useEffect(() => {
    if (academicYears) {
      setAcademicYearsOptions(academicYears.map((academicYear: { year: any }) => academicYear.year));
    }
  }, [data, acadmicYearOptions]);

  const [inputStudentId, setInputStudentId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputStudentId(event.target.value);
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    await axios(`${BASE_URL}/students?idNumber=${inputStudentId}`).then((res) => {
      console.log(res.data.data[0]);
      navigate(`/grades/add/${res.data.data[0]?._id}`);
    });
  };

  if (!studentId) {
    return (
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Enter Student ID"
          variant="outlined"
          value={inputStudentId}
          onChange={handleInputChange}
          style={{ marginBottom: 16, width: '80%' }}
        />
        <Button type="submit" variant="contained" color="primary" style={{ width: '80%' }}>
          Submit
        </Button>
      </form>
    );
  }

  const subjectFields: Field[] | undefined =
    data && data[0].stream && data[0].stream.subjects
      ? data[0].stream.subjects.map((subject: { _id: any; name: any }) => ({
          name: `${subject._id}`,
          label: `${subject.name}`,
          type: 'number'
        }))
      : [];

  const fields: Field[] = [
    { name: 'semester', label: 'Semester', type: 'dropdown', options: ['I', 'II'] },
    { name: 'academicYear', label: 'Academic Year', type: 'dropdown', options: [...acadmicYearOptions] },
    ...(subjectFields || []),
    { name: 'rank', label: 'Rank', type: 'number' },
  ];

  const buttons: ButtonConfig[] = [{ label: 'Submit', onClick: handleSubmit }];

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" gutterBottom style={{ color: colorConfigs.text }}>
        Add Grades
      </Typography>

      <CustomForm onSubmit={handleSubmit} fields={fields} buttons={buttons} isLoading={isLoading} error={error} successMessage={successMessage} />
    </Container>
  );
};

export default AddGrade;
