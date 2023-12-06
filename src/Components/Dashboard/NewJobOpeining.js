import { useState, useEffect } from "react";
import onClick1 from "./JobOpenings.js";
import "./../styles/PositionEditForm.css";
function NewJobOpening(props) {
  const [formData, setFormData] = useState({
    masterPositionId: "",
    masterExperienceId: "",
    totalRequisition: 0,
    openingDate: "",
  });

  const [experience, setExperience] = useState([]);
  const [position, setPosition] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

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

    fetch(`http://localhost:8080/masterPositions/getAllMasterPositions`)
      .then((response) => response.json())
      .then((masterPosition) => {
        setPosition(masterPosition);
      })
      .catch((error) => console.error("Error fetching details:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let object = JSON.stringify(formData);
    console.log("object",object);
    const response = await props.onClick1(object);
    console.log("a", response);

    if (response.ok) {
      setSuccessMessage("Position added successfully");
    }
  };
  return (
    <div>
      <p style={{ color: "blue" }}>
        {successMessage && <span>{successMessage}</span>}
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="masterPositionId">Position:</label>
        <select
          id="masterPositionId"
          name="masterPositionId"
          value={formData.masterPositionId.id}
          onChange={handleChange}
          required
        >
          <option value="masterPositionId.id"></option>
          {position.map((position) => (
            <option key={position.id} value={position.id}>
              {position.name}
            </option>
          ))}
          {/* Add more options as needed */}
        </select>
        <br />

        <label htmlFor="masterExperienceId">Experience:</label>
        <select
          id="masterExperienceId"
          name="masterExperienceId"
          value={formData.masterExperienceId.id}
          onChange={handleChange}
          required
        >
          <option value="masterExperienceId.id"></option>
          {experience.map((experience) => (
            <option key={experience.id} value={experience.id}>
              {experience.name}
            </option>
          ))}
          {/* Add more options as needed */}
        </select>
        <br />

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewJobOpening;
