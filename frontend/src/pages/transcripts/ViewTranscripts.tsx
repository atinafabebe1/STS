/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, TextField } from '@mui/material';
import useFetch from '../../hooks/useFetchHook';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../api/api';
import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import TranscriptCard from '../../components/cards/TranscriptCard';

const ViewTranscripts = () => {
  const { studentId } = useParams();
  const { data } = useFetch({ url: `${BASE_URL}/transcript?student=${studentId}` });

  useEffect(() => {
    console.log(data)
  }, [data]);

  const [inputStudentId, setInputStudentId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputStudentId(event.target.value);
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    await axios(`${BASE_URL}/students?idNumber=${inputStudentId}`).then((res)=>{
        console.log(res.data.data[0])
        navigate(`/transcript/view/${res.data.data[0]?._id}`);
    })
    
  };

  if (!studentId) {
    return (
     <form
      onSubmit={handleFormSubmit}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
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

  
  return (
     <Container component="main" maxWidth="md">
       {data && data.map((transcript:any)=>{
        return <div style={{marginTop:"20px",marginBottom:"20px"}}>
            <TranscriptCard transcript={transcript}/>
        </div>
       })}
    </Container>
  );
};

export default ViewTranscripts;
