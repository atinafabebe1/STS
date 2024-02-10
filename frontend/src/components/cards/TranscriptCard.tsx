import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import colorConfigs from '../../configs/colorConfigs';

interface Grade {
  _id: string;
  subject: { name: string };
  semester: string;
  marks: number;
  academicYear: number;
  __v: number;
}

interface Student {
  _id: string;
  fullName: string;
  idNumber: string;
  gender: string;
  stream: { name: string };
  section: string;
  dateOfAdmission: string;
  dateOfLeaving: string;
  __v: number;
}

interface Transcript {
  _id: string;
  student: Student;
  academicYear: number;
  grades: Grade[];
  totalMarks: number;
  average: number;
}

interface TranscriptCardProps {
  transcript: Transcript;
}

const TranscriptCard: React.FC<TranscriptCardProps> = ({ transcript }) => {
  return (
    <Card
      style={{
        backgroundColor: colorConfigs.paper,
        color: colorConfigs.text,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div
        style={{
          backgroundColor: colorConfigs.primary,
          color: colorConfigs.secondaryText,
          padding: '16px',
          borderRadius: '8px 8px 0 0'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Academic Year: {transcript.academicYear}
        </Typography>
      </div>

      <CardContent style={{ padding: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Student Name:</strong> {transcript.student.fullName}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>ID Number:</strong> {transcript.student.idNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Gender:</strong> {transcript.student.gender}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Stream:</strong> {transcript.student.stream?.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Total Marks:</strong> {transcript.totalMarks}
            </Typography>
          </Grid>

          {transcript.grades?.length > 0 ? (
            <Grid container spacing={2} style={{padding:"16px"}}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Grades
                </Typography>
              </Grid>
              {Array.from(new Set(transcript.grades.map((grade) => grade.semester))).map((semester) => (
                <Grid item xs={12} md={6} lg={6} key={semester}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Semester: {semester}
                    </Typography>
                    <TableContainer component={Paper} style={{ marginBottom: '16px' }}>
                      <Table size='small'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Subject</TableCell>
                            <TableCell>Semester</TableCell>
                            <TableCell align="right">Marks</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transcript.grades
                            .filter((grade) => grade.semester === semester)
                            .map((grade) => (
                              <TableRow key={grade._id}>
                                <TableCell>{grade.subject.name}</TableCell>
                                <TableCell>{grade.semester}</TableCell>
                                <TableCell align="right">{grade.marks}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography>No grades available for this academic year.</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TranscriptCard;
