import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MyForm.css";

const NewPositionForm = (props) => {
  const [masterPosition, setPosition] = useState("");
  const [totalRequisition, setNumberOfPositions] = useState("");
  const [masterExperience, setExperience] = useState([]);
  const [openingDate, setOpeningDate] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:8080/masterPositions/getMasterPositionById/${props.data}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setPosition(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [props.data]); // Include props.data in the dependency array

  const handleExperienceInputClick = () => {
    // Load master experiences when the input box is clicked
    fetch(`http://localhost:8080/Experiences/getAllExperience`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("experience", data);
        setExperience(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleInputChange1 = (e) => {
    const selectedExperienceObject = masterExperience.find(
      (exp) => exp.name === e.target.value
    );
    setSelectedExperience(selectedExperienceObject);
    console.log("Selected Experience:", selectedExperienceObject);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "masterPosition":
        setPosition(value);
        break;
      case "totalRequisition":
        setNumberOfPositions(value);
        break;
      case "masterExperience":
        setSelectedExperience(value);
        console.log("Selected Experience in handleInputChange:", value);
        break;

      default:
        break;
    }
  };

  const handleDateChange = (date) => {
    setOpeningDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Selected Experience in handleSubmit:", selectedExperience);

    const requisitionData = {
      masterPositionId: masterPosition.id,
      totalRequisition: totalRequisition,
      masterExperienceId: selectedExperience ? selectedExperience.id : null,
      openingDate: openingDate ? openingDate.toISOString() : null,
    };

    const response = await props.onClick1(requisitionData);
    console.log("a",response);

    if(response.ok)
    {
      setSuccessMessage("Position added successfully");
    }

   // console.log("requisitionData", requisitionData);

    // Make a POST request to save the requisition
    // fetch("http://localhost:8080/requisitions/saveRequisition", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(requisitionData),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Requisition saved successfully:", data);
    //     setSuccessMessage("Position added successfully");
    //     // Additional logic or redirect after successful submission
    //   })
    //   .catch((error) => {
    //     console.error("Error saving requisition:", error.message); // Log the specific error message
      //   if (error.response) {
      //     // The request was made, but the server responded with a status code outside the range of 2xx
      //     console.error("Response status:", error.response.status);
      //     console.error("Response data:", error.response.data);
      //   } else {
      //     // Something happened in setting up the request that triggered an Error
      //     console.error("Error details:", error.message);
      //   }
      //   setSuccessMessage("Error saving position");
      // });
  };

  return (
    <div>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleSubmit} className="my-form">
        <Form.Group controlId="formBasicPosition">
          <Form.Label>Position:</Form.Label>
          <Form.Control
            type="text"
            name="masterPosition"
            value={masterPosition.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicNumberOfPositions">
          <Form.Label>Number of Positions:</Form.Label>
          <Form.Control
            type="number"
            name="totalRequisition"
            value={totalRequisition}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicExperience">
          <Form.Label>Experience:</Form.Label>
          <Form.Control
            type="text"
            name="masterExperience"
            value={selectedExperience ? selectedExperience.name : ""}
            onChange={handleInputChange1}
            onClick={handleExperienceInputClick}
            list="experienceList"
          />
          <datalist id="experienceList">
            {masterExperience.map((exp) => (
              <option key={exp.id} value={exp.name} />
            ))}
          </datalist>
        </Form.Group>

        <Form.Group controlId="formBasicOpeningDate">
          <Form.Label>Opening Date:</Form.Label>
          <DatePicker
            selected={openingDate}
            onChange={handleDateChange}
            className="form-control"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewPositionForm;
