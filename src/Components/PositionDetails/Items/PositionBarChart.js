// Your parent component
import React, { useState, useEffect } from 'react';
import BarChartComponent from './Barchart';
import SampleData from './SampleData';
function PositionBarChart() {
  const [delayData, setDelayData] = useState([]);

  useEffect(() => {
    // Fetch delay data from your backend
    // Example:
    fetch('http://localhost:8080/yourApiEndpoint')
      .then(response => response.json())
      .then(data => setDelayData(data))
      .catch(error => console.error('Error fetching delay data:', error));
  }, []);

  return (
    <div>
      {/* Other components */}
      <BarChartComponent data={SampleData} />
      {/* Other components */}
    </div>
  );
}

export default PositionBarChart;
