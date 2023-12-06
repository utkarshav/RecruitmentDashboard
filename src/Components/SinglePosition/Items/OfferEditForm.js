import { useEffect } from "react";
import { useState } from "react";
import "./../../styles/PositionEditForm.css"

function OfferEditForm(props) {
    const [formData , setFormData] = useState({
        id:"",
        offerDate:"",
        joiningDate:"",
        statusId:"",
 });

 const [statusId , setOfferStatus] = useState([]);
 const [updateMessage, setUpdateMessage] = useState(null);

 useEffect(() => {
    fetch("http://localhost:8080/offersStatus/allOfferStatus")
    .then((response) => response.json())
    .then((data) => {
        if(Array.isArray(data))
        {
            setOfferStatus(data);
        }
        else 
        {
            console.error("Error: Data is not an array", data);
        }
    })
   .catch((error) => console.error("Error fetching experiences:", error));

   if (props) {
    fetch(`http://localhost:8080/offers//getOfferById/${props.data}`)
      .then((response) => response.json())
      .then((offerData) => {
        setFormData(offerData);
      })
      .catch((error) => console.error("Error fetching requisition details:", error));
  }
 }, [props])

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

  return (
    <div>
       <p style={{ color: "blue" }}>{updateMessage && <span>{updateMessage}</span>}</p>

   
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">id:</label>
      </div>
      <div>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>

      <label htmlFor="offerDate">Offer Date:</label>
      <input
        type="date"
        id="offerDate"
        name="offerDate"
        value={formData.offerDate}
        onChange={handleChange}
        required
      />
      <br />

      <label htmlFor="joiningDate">Joining Date:</label>
      <input
        type="date"
        id="joiningDate"
        name="joiningDate"
        value={formData.joiningDate}
        onChange={handleChange}
     
      />
      <br />

      <label htmlFor="statusId">Offer Status:</label>
      <select
        id="statusId"
        name="statusId"
        value={formData.statusId.id}
        onChange={handleChange}
        required
      >
        <option value="statusId.id"></option>
        {statusId.map((statusId) => (
          <option key={statusId.id} value={statusId.id}>
            {statusId.name}
          </option>
        ))}
        {/* Add more options as needed */}
      </select>
      <br />

      
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}
export default OfferEditForm;