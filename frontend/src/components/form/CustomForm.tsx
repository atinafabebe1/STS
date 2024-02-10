import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Alert, CircularProgress } from '@mui/material';

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

interface DynamicMaterialUIFormProps {
  onSubmit: (formData: Record<string, string>) => void;
  fields: Field[];
  buttons: ButtonConfig[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;

}

const DynamicMaterialUIForm: React.FC<DynamicMaterialUIFormProps> = ({ onSubmit, fields, buttons,isLoading,error }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }> | SelectChangeEvent<string>, name: string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value as string }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} >
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
              onClick={() => onClick && onClick(formData)}
              style={{ margin: '0 10px' }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : label}
            </Button>
          ))}
        </Box>
        {error && <Alert severity="error">{error.message}</Alert>}
      </Box>
    </form>
  );
};

export default DynamicMaterialUIForm;
