import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './../../styles/OffersTable.css'; // Import a separate CSS file for styling
import { FaRegEdit, FaShower } from "react-icons/fa";
import OfferEditForm from "./OfferEditForm";
import { Button, Modal } from "react-bootstrap";

function OffersTable(props) {
  const [offers, setOffers] = useState([]);
  const [editableRows, setEditableRows] = useState({});

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (offerId) =>{
     setEditId(offerId);
    setShow(true)};


  console.log("props offers table", props);
  useEffect(() => {
    fetch(`http://localhost:8080/offers/getOffersByRequisitionId/${props.data}`)
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error("Error fetching exercises:", error));
  }, []);

 

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

  console.log(offers)
  return (
    <div>
      <h3>Offers Table</h3>
      <table className="offers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Position</th>
            <th>Experience</th>
            <th>Offer Date</th>
            <th>Days Taken to Offer</th>
            <th>Joining Date</th>
            <th>Days Taken to Join</th>
            <th>Delay</th>
            <th>Offer Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.id}</td>
              <td>{offer.requisitionStatistics.requisitionId.masterPosition.name}</td>
              <td>{offer.requisitionStatistics.requisitionId.masterExperience.name}</td>
              <td>{offer.offerDate}</td>
              <td>{offer.daysTakenToOffer}</td>
              <td>{offer.joiningDate}</td>
              <td>{offer.daysTakenToJoin}</td>
              <td>{offer.delay}</td>
              <td>{offer.statusId.name}</td>
              <td><FaRegEdit className="text-primary" style={{fontSize: 19}} onClick={() => handleShow(offer.id)}>Edit</FaRegEdit>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <OfferEditForm data={editId}/>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OffersTable;
