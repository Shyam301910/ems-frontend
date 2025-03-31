import React, { useState } from 'react';
import { createEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useLocation } from 'react-router-dom';

const Employee = () => {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const location = useLocation();
    const [errors, setErrors] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const navigator = useNavigate();

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        const employee = { id, firstName, lastName, email };
        console.log(employee);

        if (validateForm()) {
            if (location.pathname.includes('/update-employee')) {
                updateEmployee(employee)
                    .then(() => navigator('/employees'))
                    .catch((error) => console.error('Error:', error));
            } else {
                createEmployee(employee)
                    .then(() => navigator('/employees'))
                    .catch((error) => console.error('Error:', error));
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (id.trim()) errorsCopy.id = '';
        else {
            errorsCopy.id = 'Employee Id is required';
            valid = false;
        }

        if (firstName.trim()) errorsCopy.firstName = '';
        else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) errorsCopy.lastName = '';
        else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) errorsCopy.email = '';
        else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        return location.pathname.includes('/update-employee') ? (
            <h2 className="text-center">Update Employee</h2>
        ) : (
            <h2 className="text-center">Add Employee</h2>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="card col-md-8 col-lg-6">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label">Employee Id:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                                    placeholder="Enter Employee Id"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                                {errors.id && <div className="invalid-feedback">{errors.id}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;