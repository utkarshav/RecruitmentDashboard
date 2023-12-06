import Body from "./Body";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";

function Dashboard() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2"><Sidebar></Sidebar></div>
          <div className="col-10 paddingStart-8">
            <div className="row">
              <div className="col-12 ps-2"><Navbar></Navbar></div>
            </div>
            <div className="row mt-2 ">
              <div className="col-12 paddingStart-5 ps-2 mr-2">
                <Body></Body>
                {/* <PositionDetails></PositionDetails> */}
                {/* <SinglePosition></SinglePosition> */}
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Dashboard;
