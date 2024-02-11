import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Alert, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

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

interface DynamicMaterialUIFormProps {
  onSubmit: (formData: Record<string, string>) => void;
  fields: Field[];
  buttons: ButtonConfig[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  successMessage?: string;
}

const DynamicMaterialUIForm: React.FC<DynamicMaterialUIFormProps> = ({ onSubmit, fields, buttons, isLoading, error, successMessage }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const { streamId, studentId } = useParams();

  const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }> | SelectChangeEvent<string>, name: string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value as string }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (streamId) {
      const formDataWithStreamid = { ...formData, streamId };
      onSubmit(formDataWithStreamid);
    } else if (studentId) {
      const formDataWithStudentid = { ...formData, student: studentId };
      onSubmit(formDataWithStudentid);
    } else {
      onSubmit(formData);
    }
  };

  

  return (
    <form>
      <Box p={3} boxShadow={2} borderRadius={4}>
        <Grid container spacing={3} justifyContent="center">
          {fields.map(({ name, label, type, options }) => (
            <Grid item xs={12} sm={6} key={name}>
              {type === 'dropdown' ? (
                <Select
                  fullWidth
                  label={label}
                  id={name}
                  name={name}
                  value={formData[name] || ''}
                  onChange={(e) => handleChange(e, name)}
                  variant="outlined"
                  size="small"
                >
                  {options?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <TextField
                  required={true}
                  fullWidth
                  label={label}
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name] || ''}
                  onChange={(e) => handleChange(e, name)}
                  variant="outlined"
                  size="small"
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Box mt={3} textAlign="center">
          {buttons.map(({ label, variant = 'contained', color = 'primary', type = 'button', onClick }, index) => (
            <Button
              key={index}
              variant={variant}
              color={color}
              type={type}
              onClick={(e) => {
                onClick && handleSubmit(e);
                setFormData({});
              }}
              style={{ margin: '0 10px' }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : label}
            </Button>
          ))}
        </Box>
        {!isLoading && error && <Alert severity="error">{error}</Alert>}
        {!isLoading && successMessage && (
          <Alert severity="success">
            {successMessage}
          </Alert>
        )}
      </Box>
    </form>
  );
};

export default DynamicMaterialUIForm;
