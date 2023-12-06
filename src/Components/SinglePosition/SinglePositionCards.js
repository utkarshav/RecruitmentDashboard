import { Card } from "react-bootstrap";
function SinglePositionCards() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Card className="p-2" style={{ height: 75 }}></Card>
          </div>
          <div className="col-2">
            <Card className="p-2" style={{ height: 75 }}></Card>
          </div>
          <div className="col-2">
            <Card className="p-2" style={{ height: 75 }}></Card>
          </div>
          <div className="col-2">
            <Card className="p-2" style={{ height: 75 }}></Card>
          </div>
          <div className="col-2">
            <Card className="p-2" style={{ height: 75 }}></Card>
          </div>
          <div className="col-2">
            <Card className="p-2" style={{ height: 75 }}></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePositionCards;
