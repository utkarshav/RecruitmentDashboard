import React from 'react';
import Card from 'react-bootstrap/Card';

function Cards() {

  return (
    <div className="container mb-3 mt-3">
      <div className='row'>
        <div className='col-3 col-lg-3'>
          <Card className='p-2' style={{height: 115}}>
            Card 1
          </Card>
        </div>
        <div className='col-3'>
          <Card className='p-2' style={{height: 115}}> Card 2
          </Card>
        </div>
        <div className='col-3'>
          <Card className='p-2' style={{height: 115}}> Card 3
          </Card>
        </div>
        <div className='col-3'>
          <Card className='p-2' style={{height: 115}}> Card 4
          </Card>
        </div>
      </div>





      {/* ... (other Card components) ... */}
    </div>
  );
}

export default Cards;
