// JobOpenings.js
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import "./../styles/JobOpenings.css";
import PositionDetails from "../PositionDetails/PositionDetails";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import NewJobOpening from "./NewJobOpeining";
const JobOpenings = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [show, setShow] = useState(false);
  const [isFormVisible, setFormVisibility] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormVisibility(false);
  };

  const handleShow = () => setShow(true);

  const handleAddButtonClick = () => {
    setFormVisibility(true);
  };

  const fetchList = async () => {
    console.log("");
    await fetch("http://localhost:8080/requisitions/getAllRequisitionSummary")
      .then((response) => response.json())
      .then((data) => setRequisitions(data))
      .catch((error) => console.error("Error fetching requisitions:", error));
  };

  useEffect(() => {
    fetchList();
  }, []); // Empty dependency array to run the effect only once on mount

  const onClick1 = async (object) => {
    console.log("in onclick1");
    try {
      const response = await fetch(
        `http://localhost:8080/requisitions/saveRequisition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        }
      );

      fetchList();

      setShow(false);
      return response;
    } catch (error) {
      throw new Error(`HTTP error! Status: ${error.status}`);
    }
  };

  console.log(requisitions);
  return (
    <div>
      <div>
        <h3>
          Job Openings{" "}
          <CgAdd onClick={handleShow} style={{ cursor: "pointer" }} />
        </h3>
      </div>

      {/*   <div>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <h2>
              <CgAdd onClick={handleShow} style={{ cursor: "pointer" }} />
              
  
            </h2>
            </div> */}
      <div className="job-openings-container">
        {requisitions.map((requisition, index) => (
          <>
            {console.log("inside map:", requisition.masterPosition.id)}
            <div key={requisition.id} className="job-opening-card">
              <FontAwesomeIcon
                icon={faBriefcase}
                size="2x"
                className="briefcase-icon"
              />
              <div className="job-opening-details">
                <Link
                  to={`/positionDetails/${requisition.masterPosition.id}`}
                  component={<PositionDetails></PositionDetails>}
                >
                  {" "}
                  <h6>{requisition.masterPosition.name}</h6>
                </Link>

                <p>Total Openings: {requisition.totalRequisition}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      <Modal
        size="md"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new Position</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <NewJobOpening onClose={handleClose} onClick1={onClick1} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobOpenings;
