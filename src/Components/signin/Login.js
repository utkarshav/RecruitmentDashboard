import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "mdb-react-ui-kit";

function Login() {
  // Define state variables for form data and errors
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const requestBody = {
        email: formData.email,
        password: formData.password,
      };

      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      };

      const loginEndpoint = "http://localhost:8080/logincheck";

      fetch(loginEndpoint, reqOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            // Handle response errors (e.g., HTTP status 4xx or 5xx)
            throw new Error("Login failed");
          }
        })
        .then((data) => {
          if (data.status === false) {
            // Handle the case where the request was not approved
            alert("Request has not been approved");
          } else {
            alert("Login successful");
            // Redirect to the "/Navbar" route
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          // Handle fetch errors (e.g., network issues, server not reachable)
          console.error("Fetch error:", error);
          alert("Failed to fetch. Please try again later.");
        });
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign in
              </p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fa icon="envelope me-3" size="lg" />
                <MDBInput
                  label=""
                  placeholder="Email"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}

              <div className="d-flex align-items-center mb-4">
                <MDBIcon fa icon="lock me-3" size="lg" />
                <div className="password-input-container d-flex align-items-center">
                  <MDBInput
                    label=""
                    placeholder="Password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="password-input"
                  />
                  {/* <div className="password-toggle-icon-container">
                    <MDBIcon
                      fa
                      icon={showPassword ? "eye-slash" : "eye"}
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    />
                  </div> */}
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <MDBBtn
                className="mb-4"
                style={{ width: "150px", height: "50px" }}
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </MDBBtn>

              <p className="text-center">
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
              <p className="text-center">
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
