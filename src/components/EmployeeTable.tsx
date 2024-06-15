import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export type Employee = {
    id: number;
    name: string,
    email: string,
    phone: number,
    department: string,
}
  

const EmployeeTable: React.FC = () => {

    const [employees, setEmployees] = React.useState<Array<Employee>>([]);
    const history = useNavigate();

    const fetchAllEmployees = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/get-all-employees");
            const data = await response.json();
            
            if(response.ok) {
                setEmployees(data);
            }
        } catch(error) {
            console.error(error);
        }
        
    }

    const handleUpdate = (employee: Employee) => {
        history("/update", { state: {
            employee,
        }});
    }

    const handleDelete = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if(response.ok) {
          console.log("Employee deleted successfully");
          setEmployees(prev => prev.filter(e => e.id !== id));
        }
      } catch(error) {
        console.error(error);
      }
    }

    React.useEffect(() => {
        fetchAllEmployees();
    }, []);


    return (
        <TableContainer component={Paper} style={{marginTop: '25px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Mobile Number</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees && employees?.map((employee) => (
              <TableRow
                key={employee.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.name}
                </TableCell>
                <TableCell align="right">{employee.email}</TableCell>
                <TableCell align="right">{employee.phone}</TableCell>
                <TableCell align="right">{employee.department}</TableCell>
                <TableCell align="center">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <ButtonGroup variant="outlined" aria-label="employee actions">
                            <Button onClick={() => handleUpdate(employee)}>Update</Button>
                            <Button onClick={() => handleDelete(employee.id)}>Delete</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default EmployeeTable;