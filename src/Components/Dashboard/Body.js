// Body.js
import React from "react";
import './../styles/Body.css';

import Cards from "./Cards.js";
import RecruitmentPieChart from "./RecruitmentPieChart.js";
import InterviewCalendar from "./InterviewCalendar.js";
import { Card } from "react-bootstrap";
import OverallOpenPositions from "./OverallOpenPositions.js";
import AnotherPieChart from "./AnotherPieChart.js";
import JobOpenings from "./JobOpenings.js";

function Body() {
  return (
    <>
      <div className="container grey">
        <div className="row">
          <div className="col">
            <Cards />
          </div>
        </div>
        <div className="row">
          <div className="col-6 mr-2">
            <Card>
              <RecruitmentPieChart></RecruitmentPieChart>
            </Card>
          </div>
          <div className="col-6 mr-2">
            <Card>
              <AnotherPieChart></AnotherPieChart>
            </Card>
          </div>
          {/* <div className='col-6'>
            <RecruitmentPieChart></RecruitmentPieChart>
         </div> */}
          {/* <div className='col-4'>
            <InterviewCalendar></InterviewCalendar>
         </div> */}
        </div>
        <div className="row mt-2 ml-2 mr-2">
          {/* <Card> */}
          <JobOpenings></JobOpenings>
          {/* </Card> */}
        </div>
      </div>
    </>
  );
}

export default Body;
