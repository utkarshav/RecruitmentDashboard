import { Card } from "react-bootstrap";
import SinglePositionCards from "./SinglePositionCards";
import OffersTable from "./Items/OffersTable";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import { useParams } from "react-router-dom";

export default function SinglePosition() {
  const {requisitionId} = useParams();
  console.log("props single position:", requisitionId);
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
                    <SinglePositionCards />
                  </div>
                  <div className="row">
                    <OffersTable data = {requisitionId} ></OffersTable>
                  </div>
                  <div className="row">
                    
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
