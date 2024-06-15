import React, { ChangeEvent, FormEvent, FormEventHandler } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddEmployee: React.FC = () => {
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [mobile, setMobile] = React.useState<string>('');
    const [department, setDepartment] = React.useState<string>('');

    const history = useNavigate();

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onChangeMobile = (e: ChangeEvent<HTMLInputElement>) => {
        setMobile(e.target.value);
    }

    const onChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEmployee = {
            name: name,
            email: email,
            phone: mobile,
            department: department
        }

        try {
            const response = await fetch("http://localhost:8080/api/create-employee", {
                method: "POST",
                body: JSON.stringify(newEmployee),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if(response.ok) {
                console.log("Employee added successfully");
                setName('');
                setEmail('');
                setDepartment('');
                setMobile('');
                history("/");
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <form style={{marginTop: "15px"}} onSubmit={handleSubmit}>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 400,
                    margin: 'auto',
                    bgcolor: '#f0f0f0', // Light grey background color
                    padding: '20px',
                    borderRadius: '5px',
                }}
            >
                <TextField required label="Name" name="Name" type="text" value={name} onChange={onChangeName} margin="normal"/>
                <TextField required label="Email" name="Email" type="email" value={email} onChange={onChangeEmail} margin="normal"/>
                <TextField required label="Mobile" name="Mobile" type="number" value={mobile} onChange={onChangeMobile} margin="normal"/>
                <TextField required label="Department" name="Department" type="text" value={department} onChange={onChangeDepartment} margin="normal"/>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </form>
    )
}

export default AddEmployee;
