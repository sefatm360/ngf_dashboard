import React from 'react';
import CreateQueensOffer from './CreateQueensOffer';
import UpdateQueensOffer from './UpdateQueensOffer';

const QueensOfferModals = ({ data, setUpdateSpinner }) => {
  const { modal } = data;

  return modal === 'Update Queens Offer' ? (
    <UpdateQueensOffer data={data} />
  ) : modal === 'Create Queens Offer' ? (
    <CreateQueensOffer />
  ) : (
    ''
  );
};

export default QueensOfferModals;
