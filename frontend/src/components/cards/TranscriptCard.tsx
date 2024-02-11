import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import colorConfigs from '../../configs/colorConfigs';
import { Print, Edit } from '@mui/icons-material';

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
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div
        style={{
          backgroundColor: colorConfigs.primary,
          color: colorConfigs.secondaryText,
          padding: '2px 8px'
        }}
      >
        <div style={{ display: 'flex' }}>
          <Typography style={{ width: '360px' }} variant="h6" gutterBottom>
            Academic Year: {transcript.academicYear}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button
              size="small"
              variant="contained"
              style={{
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                marginLeft: '20px'
              }}
              startIcon={<Print />}
            >
              Print
            </Button>
            <Button
              size="small"
              variant="contained"
              style={{ background: 'none', border: 'none', boxShadow: 'none', marginLeft: '20px' }}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </div>
        </div>
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
            <Grid container spacing={2} style={{ padding: '16px' }}>
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
                      <Table size="small">
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
