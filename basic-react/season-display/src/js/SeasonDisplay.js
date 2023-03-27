import './SeasonDisplay.scss';
import React from 'react';

const seasonConfig = {
  summer: {
    text: "Let's hit the beach!",
    iconName: 'sun',
  },
  winter: {
    text: 'Burr, it is cold!',
    iconName: 'snowflake',
  },
};

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

// This function will return JSX from this module
const SeasonDisplay = function (props) {
  const monthNum = new Date().getMonth();
  const season = getSeason(props.lat, monthNum);
  const { text, iconName } = seasonConfig[season];

  return (
    <div className={`season-display ${season}`}>
      <i className={`${iconName} icon-left massive icon`} />
      <h1 className="heading-text">{text}</h1>
      <i className={`${iconName} icon-right massive icon`} />
    </div>
  );
};

export default SeasonDisplay;
