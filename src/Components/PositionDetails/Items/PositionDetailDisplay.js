import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit, FaShower } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import PositionEditForm from "./PositionEditForm";

function PositionDetailDisplay(props) {
  let masterPositionId = props.data;
  const [requisition, setPositionsData] = useState([]);
  const [isFormVisible, setFormVisibility] = useState(false);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (positionId) => {
    setEditId(positionId);
    setShow(true);
  };

  const handleAddButtonClick = () => {
    setFormVisibility(true);
  };

  const fetchList = async (masterPositionId) => {
    console.log("in fetchlist");

    await fetch(
      `http://localhost:8080/requisitions/byMasterPosition/${masterPositionId}`
    )
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 200) {
          console.log("Success");
          return response.json();
        } else {
          console.log("Failed");
        }
      })
      .then((data) => {
        console.log("My data:", data);
        setPositionsData(data);
      });
  };
  useEffect(() => {
    console.log("Inside UseEffect");
    fetchList(masterPositionId);
  }, [masterPositionId]); // <-- Empty dependency array to run the effect only once

  const handleDelete = (requisitionId) => {
    const url = `http://localhost:8080/requisitions/deleteRequisition/${requisitionId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status: ${response.status}");
        }
        
      })
      .then(() => {
        console.log("Position deleted Successfully");
        fetchList(masterPositionId);
      })
      .catch((error) => {
        console.error("Error deleting requisition:", error);
      });
  };

  console.log("My Data:", props.data);
  console.log("Requisition:", requisition);

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Position</th>
            <th>Total Positions</th>
            <th>Experience </th>
            <th>Opening Date</th>
            <th>Closing Date</th>
            <th>Revised Closure date</th>
            <th>Open Since</th>
            <th>Days to fill</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requisition.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>
                <Link to={`/positions/${req.id}`}>
                  {req.masterPosition ? req.masterPosition.name : "N/A"}
                </Link>
              </td>
              <td>{req.totalRequisition}</td>
              <td>{req.masterExperience.name}</td>
              <td>{req.openingDate}</td>
              <td>{req.closureDate}</td>
              <td>{req.revisedClosureDate}</td>
              <td>{req.openSince}</td>
              <td>{req.daysToFillPosition}</td>
              <td className="text-center">
                <MdDeleteOutline
                  className="text-danger me-1"
                  style={{ fontSize: 22 }}
                  onClick={() => handleDelete(req.id)}
                />
                <FaRegEdit
                  className="text-primary"
                  style={{ fontSize: 19 }}
                  onClick={() => handleShow(req.id)}
                />
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
          <PositionEditForm data={editId} />
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

export default PositionDetailDisplay;
