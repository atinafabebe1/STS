/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import colorConfigs from '../../configs/colorConfigs';

interface Grade {
  subject: string;
  marks: number;
}

interface Semester {
  grades: Grade[];
}

interface Transcript {
  academicYear: number;
  student: string;
  totalMarks: number;
  average: number;
  rank?: number;
  conduct?: string;
  grades: Semester[];
}

interface TranscriptCardProps {
  transcript: Transcript;
}

const TranscriptCard: React.FC<TranscriptCardProps> = ({ transcript }) => {
  return (
    <Card style={{ backgroundColor: colorConfigs.paper, color: colorConfigs.text, borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ backgroundColor: colorConfigs.primary, color: colorConfigs.secondaryText, padding: '16px', borderRadius: '8px 8px 0 0' }}>
        <Typography variant="h5" gutterBottom>
          Academic Year: {transcript.academicYear}
        </Typography>
      </div>

      <CardContent style={{ padding: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Student:</strong> {transcript.student}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Total Marks:</strong> {transcript.totalMarks}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Average:</strong> {transcript.average}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Rank:</strong> {transcript.rank || 'Not available'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Conduct:</strong> {transcript.conduct || 'Not available'}
            </Typography>
          </Grid>

          {transcript.grades && transcript.grades.length > 0 ? (
            <Grid item xs={12} style={{ marginTop: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Grades
              </Typography>
              {transcript.grades.map((semester, index) => (
                <TableContainer component={Paper} key={index} style={{ marginBottom: '16px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell align="right">Marks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {semester.grades.map((grade, gradeIndex) => (
                        <TableRow key={gradeIndex}>
                          <TableCell>{grade.subject}</TableCell>
                          <TableCell align="right">{grade.marks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
