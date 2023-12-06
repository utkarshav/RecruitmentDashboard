import { Route, Routes, useParams } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import PositionDetails from "../Components/PositionDetails/PositionDetails";
import Body from "../Components/Dashboard/Body";
import Sidebar from "../Components/Common/Sidebar";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/signin/Login";
import SinglePosition from "../Components/SinglePosition/SinglePosition";
function Routing() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {/* <Route path="/Navbar" element={<Navbar />}></Route> */}
        <Route path="/positions/:positionId" element={<PositionDetails />} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route
          path="/positionDetails/:positionId"
          element={<PositionDetails />}
        />
          <Route path="/singlePositions/:requisitionId" element={<SinglePosition/>} />
      </Routes>
    </div>
  );
}

export default Routing;
