import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  startTransition,
} from "react";
import { CgAdd } from "react-icons/cg";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./PositionTable.css";
import NewPositionForm from "./NewPositionForm";
import "./../../SinglePosition/SinglePosition";
import Routing from "../../../routing/Routing";
import SinglePosition from "./../../SinglePosition/SinglePosition";
import { IoIosExpand } from "react-icons/io";
import onClick1 from "./PositionTable";
const PositionDetailDisplay = lazy(() => import("./PositionDetailDisplay"));

function PositionTable(props) {
  console.log("props", props);
  const { id } = props.data;
  const { positionId } = useParams();
  const [requisition, setPositionsData] = useState([]);
  const [isFormVisible, setFormVisibility] = useState(false);
  const [masterPosition, setMasterPosition] = useState([]);
  const [show, setShow] = useState(false);
  const [click, setClick] = useState(false);
  const handleAddButtonClick = () => {
    setFormVisibility(true);
  };

  const fetchList = async (positionId) => {
    console.log("check 1");
    await fetch(
      `http://localhost:8080/requisitions/byMasterPosition/${positionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setPositionsData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    console.log("useEffect 1");
    if (props?.data !== undefined) {
      fetchList(props.data);
    }
  }, [props]); // Make sure to include id in the dependency array

  const handleClose = () => {
    setShow(false);
    setFormVisibility(false);
  };

  const handleClose1 = () => {
    setClick(false);
    setFormVisibility(false);
  };

  const handleShow = () => setShow(true);

  const handleViewClick = () => {
    console.log("I Clicked");
    setClick(true);
  };
  console.log("props", props);
  const onClick1 = async (requisitionData) => {
    console.log("in onclick1");
    try {
      const response = await fetch(
        "http://localhost:8080/requisitions/saveRequisition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requisitionData),
        }
      );

      fetchList(props.data);

      setShow(false);

      return response;
    } catch (error) {
      throw new Error(`HTTP error! Status: ${error.status}`);
    }
  };

  return (
    <>
      <div className="overall-container">
        <div className="d-flex justify-content-between">
          <div>
            <h3>Open Positions</h3>
          </div>

          <div>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            <h2>
              <CgAdd onClick={handleShow} style={{ cursor: "pointer" }} />
              {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />   */}
              {/* <span
                style={{ cursor: "pointer" }}
                onClick={handleViewClick}
                class="material-symbols-outlined"
              >
                info_i
              </span> */}
              <IoIosExpand
                style={{ cursor: "pointer" }}
                onClick={handleViewClick}
              />
            </h2>
          </div>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Position</th>
              <th>Total Positions</th>
              <th>Joined </th>
              <th>Experience</th>
              <th>Opening Date</th>
              <th>Average Delay</th>
            </tr>
          </thead>
          <tbody>
            {requisition.map((requisition) => (
              <tr key={requisition.id}>
                <td>{requisition.id}</td>
                <td>
                  <Link to={`/singlePositions/${requisition.id}`}>
                    {requisition.masterPosition
                      ? requisition.masterPosition.name
                      : "N/A"}
                  </Link>
                </td>

                <td>{requisition.totalRequisition}</td>
                <td></td>
                <td>
                  {requisition.masterExperience
                    ? requisition.masterExperience.name
                    : "N/A"}
                </td>
                <td>{requisition.openingDate}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
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
            {/* {isFormVisible ? <NewPositionForm onClose={handleClose} /> : null} */}
            <NewPositionForm
              onClose={handleClose}
              data={positionId}
              onClick1={onClick1}
            />
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>

        <Modal
          size="xl"
          show={click}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Position Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Suspense fallback={<div>Loading...</div>}>
              {startTransition(() => (
                <PositionDetailDisplay onClose={handleClose1} data={positionId} />
              ))}
            </Suspense> */}
            <Suspense fallback={<div>Loading...</div>}>
              <PositionDetailDisplay data={positionId} />
            </Suspense>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default PositionTable;
