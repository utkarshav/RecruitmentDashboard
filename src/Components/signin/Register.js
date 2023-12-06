import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

function Register() {
  const [formData, setFormData] = useState({
    name: '', // Initial value for name
    email: '', // Initial value for email
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password should contain at least one capital letter, one special character, and one number';
      valid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform login logic here (e.g., send data to the server)
      console.log('Login successful');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fa icon="user me-3" size='lg' />
              <MDBInput label='' placeholder='Name' id='name' type='text' name='name' value={formData.name} onChange={handleChange} />
              </div>
              {errors.name && <div className="error-message">{errors.name}</div>}

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fa icon="envelope me-3" size='lg' />
                <MDBInput label='' placeholder='Email' id='email' type='email' name='email' value={formData.email} onChange={handleChange} />
                </div> {errors.email && <div className="error-message">{errors.email}</div>}
             

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fa icon="lock me-3" size='lg' />
                <MDBInput label='' placeholder='Password' id='password' type='password' name='password' value={formData.password} onChange={handleChange} />
                </div> {errors.password && <div className="error-message">{errors.password}</div>}
            

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fa icon="key me-3" size='lg' />
                <MDBInput label='' placeholder='Confirm Password' id='confirmPassword' type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>

              <MDBBtn
              className='mb-4'
              style={{ width: '150px', height: '50px' }} // Adjust the width and height as needed
              type='submit'
              onClick={handleSubmit}
            >
              Register
            </MDBBtn>
            <p className="text-center">
              Already have an account? <Link to="/login">Sign in</Link></p>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
