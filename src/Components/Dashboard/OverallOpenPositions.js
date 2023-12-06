import React, { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './../styles/OverallOpenPositions.css';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CgAdd } from 'react-icons/cg'; 

function OverallOpenPositions() {
  const [requisition, setPositionsData] = useState([]);
  const [isFormVisible, setFormVisibility] = useState(false);

  const handleAddButtonClick = () => {
    setFormVisibility(true);
  };

  useEffect(() => {
    fetch('http://localhost:8080/requisitions/allRequisitions')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        setPositionsData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <><div className="overall-container">
      <div className='d-flex justify-content-between'>
        <div><h2>Overall Open Positions</h2></div>
        <div><h2><CgAdd onClick={handleShow} /></h2></div>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Position</th>
            <th>Total Positions</th>
            <th>Carry Forwarded</th>
            <th>Experience</th>
            <th>Opening Date</th>
            <th>Closing Date</th>
            <th>Revised Closing Date</th>
            <th>Expected Closure Days</th>
            <th>Average Delay</th>
          </tr>
        </thead>
        <tbody>
          {requisition.map((requisition) => (
            <tr key={requisition.id}>
              <td>{requisition.id}</td>
              <td><Link to={`/positions/${requisition.id}`}>
                    {requisition.masterPosition ? requisition.masterPosition.name : 'N/A'}
                  </Link></td>
              <td>{requisition.totalRequisition}</td>
              <td>{requisition.carryForwardedRequisition}</td>
              <td>{requisition.masterExperience ? requisition.masterExperience.name : 'N/A'}</td>
              <td>{requisition.openingDate}</td>
              <td>{requisition.closureDate}</td>
              <td>{requisition.revisedClosureDate}</td>
              <td>{requisition.daysToFillPosition}</td>
              {/* Add more fields as needed */}

              {/* Add more fields as needed */}
              <td>{/* Add your other fields here */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div><div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don not even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div></>
  );
}

export default OverallOpenPositions;
