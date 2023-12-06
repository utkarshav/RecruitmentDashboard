import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import PositionCards from "./Items/PositionCards";
import PositionPieChart from "./Items/PositionPieChart";
import PositionTable from "./Items/PositionTable";
import PositionBarChart from "./Items/PositionBarChart";
import PositionInterviewCalendar from "./Items/PositionInterviewCalender";
import { useParams } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

// Replace 'yourServiceMethod' with the actual method name
const yourServiceMethod = async (positionId) => {
  const response = await fetch(`http://localhost:8080/requisitions/byMasterPosition/${positionId}`);
  if (!response.ok) {
    throw new Error(`Error fetching requisitions: ${response.statusText}`);
  }
  return response.json();
};

function PositionDetails() {
  const { positionId } = useParams();
  console.log("masterPositionId:", positionId);

  const [requisitions, setRequisitions] = useState([]);

  useEffect(() => {
    // Call your service method here and update the state
    // Replace 'yourServiceMethod' with the actual method name
    yourServiceMethod(positionId)
      .then((data) => setRequisitions(data))
      .catch((error) => console.error("Error fetching requisitions:", error));
  }, [positionId]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar></Sidebar>
          </div>
          <div className="col-10 paddingStart-8">
            <div className="row">
              <div className="col-12 ps-2">
                <Navbar></Navbar>
              </div>
            </div>
            <div className="row mt-2 ">
              <div className="col-12 paddingStart-5 ps-2 mr-2">
                <div className="container">
                  <div className="row">
                    <PositionCards></PositionCards>
                  </div>
                  <div className="row">
                    <div className="col-7 mt-2">
                      <Card>
                        <PositionPieChart></PositionPieChart>
                      </Card>
                    </div>
                    <div className="col-5">
                      <PositionTable data={positionId}></PositionTable>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-7 mt-2">
                      <Card>
                        <PositionBarChart></PositionBarChart>
                      </Card>
                    </div>
                    <div className="col-5 mt-2">
                      <Card>
                        <PositionInterviewCalendar></PositionInterviewCalendar>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PositionDetails;
