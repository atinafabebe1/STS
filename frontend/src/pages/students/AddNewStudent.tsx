import CustomForm from '../../components/form/CustomForm'

const AddNewStudent = () => {
  const handleSubmit = (formData: unknown) => {
    console.log('Form Data:', formData);
  };

  const formFields = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'stream', label: 'Stream', type: 'text' },
    { name: 'section', label: 'Section', type: 'text' },
    { name: 'idNumber', label: 'ID Number', type: 'text' },
    { name: 'gender', label: 'Gender', type: 'text' },
    { name: 'dateOfAdmission', label: 'Date of Admission', type: 'date' },
    { name: 'dateOfLeaving', label: 'Date of Leaving', type: 'date' },
  ];

  const formButtons = [
    { label: 'Submit', onClick: () => console.log('Submit button clicked') },
    { label: 'Cancel', onClick: () => console.log('Cancel button clicked') },
  ];

  return (
    <div>
      <h2>Student Information Form</h2>
      <CustomForm onSubmit={handleSubmit} fields={formFields} buttons={formButtons} />
    </div>
  );
};

export default AddNewStudent;
