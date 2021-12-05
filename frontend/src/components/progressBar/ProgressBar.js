import React from "react";
import './progressBar.css';

const ProgressBar = ({currentLevel=1, numberOfLevels=10, theme="dark" }) => {

    /**
     * Function to calculate percentage of step compared to total steps
     * @param {Number} current current step/percentage you are on
     * @param {Number} total total number of steps available
     * @returns {Number} calculated percentage
     */
    const calculatePercentage =(current, total)=>{
        let percent = (current/total)*100;
        return percent;
    }
  return (
    <div className={`progress ${theme==="light"?"muon-progress-light":"muon-progress" }`}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{width: `${calculatePercentage(currentLevel, numberOfLevels)}%`, transition:'all 0.5s'}}
        aria-valuenow={calculatePercentage(currentLevel, numberOfLevels)}
        aria-valuemin={"0"}
        aria-valuemax={numberOfLevels}
      ></div>
    </div>
  );
};

export { ProgressBar };
