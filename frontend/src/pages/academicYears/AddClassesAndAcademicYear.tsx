import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  FormGroup,
  SelectChangeEvent
} from '@mui/material';
import usePostHook from '../../hooks/usePostHook';
import useFetch from '../../hooks/useFetchHook';
import colorConfigs from '../../configs/colorConfigs';
import { BASE_URL } from '../../api/api';

interface Class {
  _id: string;
  gradeLevel: string;
  sections: string[];
}

const AddClassToAcademicYear: React.FC = () => {
  const { handleSubmit } = usePostHook(`${BASE_URL}/academicYears/addClassToAcademicYear`);
  const { data: classesData } = useFetch({ url: `${BASE_URL}/classes` });

  const [activeStep, setActiveStep] = useState<number>(0);
  const [academicYear, setAcademicYear] = useState<string>('');
  const [selectedGradeLevels, setSelectedGradeLevels] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<Record<string, string[]>>({});

  useEffect(() => {
    console.log(classesData);
  }, [classesData]);

  const classes: Class[] = classesData || [];

  const gradeLevels: string[] = Array.from(new Set(classes.map((cls: Class) => cls.gradeLevel)));

  const handleGradeLevelsChange = (event: SelectChangeEvent<string[]>) => {
    const selectedGradeLevels = event.target.value as string[];
    setSelectedGradeLevels(selectedGradeLevels);
  };

  const handleNextClick = () => {
    setActiveStep((prevStep) => prevStep + 1);
    if (activeStep === 1) {
      const updatedSections: Record<string, string[]> = {};
      selectedGradeLevels.forEach((gradeLevel) => {
        updatedSections[gradeLevel] = [];
      });
      setSelectedSections(updatedSections);
    }
  };

  const handleBackClick = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSectionsChange = (gradeLevel: string, section: string) => {
    const updatedSections = { ...selectedSections };
    updatedSections[gradeLevel] = updatedSections[gradeLevel].includes(section)
      ? updatedSections[gradeLevel].filter((s) => s !== section)
      : [...updatedSections[gradeLevel], section];

    setSelectedSections(updatedSections);
  };

  const handleFormSubmit = () => {
    console.log('Submitted:', { academicYear, selectedGradeLevels, selectedSections });
    handleSubmit({ academicYear, gradeLevels: selectedGradeLevels, sections: selectedSections });
  };

  const getSteps = () => ['Select Academic Year', 'Select Grade Levels', 'Select Sections'];

  const steps = getSteps();

  return (
    <Box>
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '30px' }}>
        <Typography variant="h4" gutterBottom style={{ color: colorConfigs.text }}>
          Register New Acadmic Year
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container spacing={3}>
          {activeStep === 0 && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Academic Year"
                variant="outlined"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="grade-levels-label">Grade Levels</InputLabel>
                <Select
                  labelId="grade-levels-label"
                  id="grade-levels"
                  multiple
                  value={selectedGradeLevels}
                  onChange={handleGradeLevelsChange}
                  label="Grade Levels"
                  renderValue={(selected) => (selected as string[]).join(', ')}
                >
                  {gradeLevels.map((gradeLevel) => (
                    <MenuItem key={gradeLevel} value={gradeLevel}>
                      {gradeLevel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Sections for the chosen Grade Levels
              </Typography>
              <FormControl fullWidth>
                <FormGroup>
                  {selectedGradeLevels.map((gradeLevel) => (
                    <div key={gradeLevel}>
                      <Typography variant="subtitle1">{`Grade Level ${gradeLevel}`}</Typography>
                      {classes
                        .filter((cls: Class) => cls.gradeLevel === gradeLevel)
                        .flatMap((cls: Class) => cls.sections)
                        .map((section) => (
                          <FormControlLabel
                            key={section}
                            control={<Checkbox checked={selectedSections[gradeLevel]?.includes(section)} onChange={() => handleSectionsChange(gradeLevel, section)} />}
                            label={section}
                          />
                        ))}
                    </div>
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Box marginTop="16px">
          {activeStep === 0 ? (
            <Button variant="contained" color="primary" onClick={handleNextClick}>
              Next
            </Button>
          ) : (
            <>
              <Button variant="outlined" color="primary" onClick={handleBackClick}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? handleFormSubmit : handleNextClick}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AddClassToAcademicYear;
