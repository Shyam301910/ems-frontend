import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const EmployeeList = () => {

  const [employees, setEmployees] = useState([])

  const navigator = useNavigate()

  useEffect(() => {
    listEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error))
  }, [])

  function addNewEmployee() {
    navigator('/add-employee')
  }

  function updateEmployee() {
    navigator('/update-employee')
  }

  function handleDelete(id) {
    console.log('Deleting employee with id:', id)
    deleteEmployee(id)
      .then((response) => {
        console.log(response)
        listEmployees()
          .then((response) => setEmployees(response.data))
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className='container mt-4'>
      <div className="row">
        <div className="col-12">
          <h2 className='text-center mb-4'>List of Employees</h2>
        </div>
        <div className="col-12 text-start mb-3">
          <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>
        </div>
        <div className="col-12">
          <div className="table-responsive">
            <table className='table table-striped table-bordered'>
              <thead>
                <tr>
                  <th>Employee Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  employees.map((employee) =>
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.email}</td>
                      <td>
                        <button
                          className="btn btn-info m-1 w-100"
                          style={{ maxWidth: '100px' }}
                          onClick={updateEmployee}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger m-1 w-100"
                          style={{ maxWidth: '100px'}}
                          onClick={() => {
                            handleDelete(employee.id)
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList