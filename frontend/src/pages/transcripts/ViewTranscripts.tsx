import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

function ViewTranscripts() {
  const { studentId } = useParams();

  if(!studentId){
    return <TextField></TextField>
  }
  
  return <div>
    {studentId}
  </div>;
}

export default ViewTranscripts;
