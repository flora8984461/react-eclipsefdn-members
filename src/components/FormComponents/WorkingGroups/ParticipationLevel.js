import React, { useState, useEffect } from "react";
import Select from "../Inputs/Select";
import { FETCH_HEADER } from '../../../Constants/Constants';

const ParticipationLevel = ({name, workingGroup}) => {

  const [participationLevels, setParticipationLevels] = useState([])

  useEffect(() => {
    let isSubscribed = true;

    fetch('workingGroups.json', { headers : FETCH_HEADER })
      .then(res => res.json())
      .then(data => {
        if (isSubscribed) {
          let temp = data.working_groups?.find(item => workingGroup === item.id)
          setParticipationLevels(temp?.participation_levels)
        }
      })

    // cancel subscription to useEffect
    return () => (isSubscribed = false)
  }, [workingGroup])

  return (
    <>
      <h4 className="fw-600 margin-top-30">What is your intended participation level?</h4>
      <Select
        label="ParticipationLevel"
        name={name}
        options={participationLevels}
      />
    </>
  );
};

export default ParticipationLevel