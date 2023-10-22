import React from 'react';
import ApplicantDetailsEdit from './FundEditModalComponents/ApplicantDetailsEdit';
import GuaranterDetailsEdit from './FundEditModalComponents/GuaranterDetailsEdit';
import GuarenterNidEdit from './FundEditModalComponents/GuarenterNidEdit';

const FundEditModal = ({ setUpdateSpinner, data }) => {
  const { modal, fundDetails, fundId, setFundDetails } = data;
  if (modal === 'Applicant Edit') {
    return (
      <ApplicantDetailsEdit
        setUpdateSpinner={setUpdateSpinner}
        data={fundDetails}
        setFundDetails={setFundDetails}
        fundId={fundId}
      />
    );
  } else if (modal === 'Guaranter Edit') {
    return (
      <GuaranterDetailsEdit
        setUpdateSpinner={setUpdateSpinner}
        data={fundDetails}
        fundId={fundId}
        setFundDetails={setFundDetails}
      />
    );
  } else if (modal === 'NID Edit') {
    return (
      <GuarenterNidEdit
        setUpdateSpinner={setUpdateSpinner}
        data={fundDetails}
        setFundDetails={setFundDetails}
      />
    );
  } else {
    return <h3>Nothing to edit</h3>;
  }
};

export default FundEditModal;
