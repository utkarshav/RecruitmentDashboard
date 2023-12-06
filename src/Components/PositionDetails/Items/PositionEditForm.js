import { useState } from "react";
import "./../../styles/PositionEditForm.css";
import { useEffect } from "react";


function PositionEditForm(props) {
  const [formData, setFormData] = useState({
    masterPosition: "",
    totalRequisition: 0,
    masterExperience: "",
    openingDate: "",
    closureDate: "",
    revisedClosureDate: "",
  });

  const [experience, setExperience] = useState([]);
  const [updateMessage, setUpdateMessage] = useState(null);

 console.log(props);

 useEffect(() => {
    // Fetch all experiences
    fetch("http://localhost:8080/Experiences/getAllExperience")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExperience(data);
        } else {
          console.error("Error: Data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching experiences:", error));

    // Fetch requisition details based on props (assuming props is the requisition ID)
    if (props) {
      fetch(`http://localhost:8080/requisitions/getRequisitionById/${props.data}`)
        .then((response) => response.json())
        .then((requisitionData) => {
          setFormData(requisitionData);
        })
        .catch((error) => console.error("Error fetching requisition details:", error));
    }
  }, [props]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update requisition data
    fetch(`http://localhost:8080/requisitions/updateRequisition/${props.data}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(updatedRequisition => {
        console.log('Requisition updated successfully:', updatedRequisition);
        setUpdateMessage("Requisition updated successfully!");
        // Handle any additional logic after the requisition is updated
      })
      .catch(error => {
        console.error('Error updating requisition:', error);
        setUpdateMessage('Error updating requisition. Please try again.');
        // Handle errors
      });
  };

  console.log("Form Data:", formData);

  return (
    <div>
       <p style={{ color: "blue" }}>{updateMessage && <span>{updateMessage}</span>}</p>

   
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="masterPosition">Position:</label>
      </div>
      <div>
        <input
          type="text"
          id="masterPosition"
          name="masterPosition"
          value={formData.masterPosition.name}
          onChange={handleChange}
          required
        />
      </div>

      <label htmlFor="totalRequisition">Total Positions:</label>
      <input
        type="number"
        id="totalRequisition"
        name="totalRequisition"
        value={formData.totalRequisition}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="masterExperience">Experience:</label>
      <select
        id="masterExperience"
        name="masterExperience"
        value={formData.masterExperience.id}
        onChange={handleChange}
        required
      >
        <option value="masterExperience.id"></option>
        {experience.map((experience) => (
          <option key={experience.id} value={experience.id}>
            {experience.name}
          </option>
        ))}
        {/* Add more options as needed */}
      </select>
      <br />

      <label htmlFor="openingDate">Opening Date:</label>
      <input
        type="date"
        id="openingDate"
        name="openingDate"
        value={formData.openingDate}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="closureDate">Closing Date:</label>
      <input
        type="date"
        id="closureDate"
        name="closureDate"
        value={formData.closureDate}
        onChange={handleChange}
     
      />
      <br />

      <label htmlFor="revisedClosureDate">Revised Closure Date:</label>
      <input
        type="date"
        id="revisedClosureDate"
        name="revisedClosureDate"
        value={formData.revisedClosureDate}
        onChange={handleChange}
        
      />
      <br />

      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default PositionEditForm;
