import React, { useState, useEffect } from 'react';
import { FETCH_HEADER } from '../../../Constants/Constants';
import DefaultSelect from '../Inputs/CustomSelect/DefaultSelect';
import CustomSelectWrapper from '../Inputs/CustomSelect/CustomSelectWrapper';

const ParticipationLevel = ({name, workingGroup}) => {
  const workingGroupsData = JSON.parse(localStorage.getItem('workingGroupsData'));
  const [participationLevels, setParticipationLevels] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    if (!workingGroupsData) {
      fetch('workingGroups.json', { headers : FETCH_HEADER })
      .then(res => res.json())
      .then(data => {
        if (isSubscribed) {
          let temp = data.working_groups?.find(item => workingGroup === item.id);
          setParticipationLevels(temp?.participation_levels);
        }
      })
    }
    else {
      let temp = workingGroupsData?.find(item => workingGroup === item.value);
      setParticipationLevels(temp?.participation_levels);
    }
    // cancel subscription to useEffect
    return () => (isSubscribed = false)

    // eslint-disable-next-line
  }, [workingGroup])

  const renderOptions = (array) => {
    return array?.map(el => ({ label: el, value: el }))
  }

  return (
    <>
      <h4 className="fw-600 margin-top-30">What is your intended participation level?<span className="orange-star margin-left-5">*</span></h4>
      <div className="row">
      <div className="col-md-12">
      <CustomSelectWrapper
        name={name}
        renderComponent={DefaultSelect}
        options={renderOptions(participationLevels)}
      />
      </div>
      </div>
    </>
  );
};

export default ParticipationLevel