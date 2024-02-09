import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button, { ButtonProps } from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface Field {
  name: string;
  label: string;
  type: string;
}

interface ButtonConfig extends Omit<ButtonProps, 'onClick'> {
  label: string;
  onClick?: () => void;
}

interface DynamicMaterialUIFormProps {
  onSubmit: (formData: Record<string, string>) => void;
  fields: Field[];
  buttons: ButtonConfig[];
}

const DynamicMaterialUIForm: React.FC<DynamicMaterialUIFormProps> = ({ onSubmit, fields, buttons }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box p={3} boxShadow={2} borderRadius={4}>
        <Grid container spacing={3} justifyContent="center">
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                variant="outlined" 
                size="small" 
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={3} textAlign="center">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant || 'contained'}
              color={button.color || 'primary'}
              type={button.type || 'button'}
              onClick={button.onClick}
              style={{ margin: '0 10px' }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Box>
    </form>
  );
};

export default DynamicMaterialUIForm;
