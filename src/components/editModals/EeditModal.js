import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { useLocation } from 'react-router';
import { useAdminContext } from '../../contexts/adminContext';
import { HIDE_MODAL } from '../../helpers/constants';
import Spinner from '../Spinner';
import FundEditModal from './FundEditModal';
import EditGigModal from './GigEditModals/EditGigModal';
import EditSliderModals from './EditSliderModals';
import GigOrderEditModal from './GigOrderEditModal';
import OfferEditModal from './OfferEditModal';
import OrderEditModal from './OrderEditModal';
import ProductEditModal from './ProductEditModal';
import QueenEditModal from './QueenEditModal';
import TrainingModal from './TrainingModal';
import QueensOfferModals from './QueensOfferModals/QueensOfferModals';
import TraineeEditModal from './TraineeEditModal';
import ReplyModal from './ReplyModal';
import SellersEditModal from './SellersEditModal';
import EditQueenConnectModal from './queenConnectEditModal/EditQueenConnectModal';

const EditModal = () => {
  const [updateSpinner, setUpdateSpinner] = useState(false);
  const {
    showModal,
    dispatch: adminDispatch,
    modalEditData,
  } = useAdminContext();

  console.log(modalEditData, 'eeedit modal data');

  const location = useLocation();

  return (
    <>
      <div
        className={`modal-back ${showModal && 'show-modal-back'}`}
        onClick={() => adminDispatch({ type: HIDE_MODAL })}
      ></div>
      {updateSpinner ? (
        <div className='show-update-spinner'>
          <Spinner />
        </div>
      ) : (
        <div className={`form-edits ${showModal && 'show-modal'}`}>
          <div className='form-edits-header'>
            {modalEditData.modal ? (
              <h3 className='mb-3'>{modalEditData?.modal} Form</h3>
            ) : (
              <h3>Edit Form</h3>
            )}
            <FaWindowClose
              onClick={() => adminDispatch({ type: HIDE_MODAL })}
            />
          </div>
          {location.pathname.startsWith('/gigs') ? (
            <EditGigModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/products') ? (
            <ProductEditModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/gig-orders') ? (
            <GigOrderEditModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/content') ? (
            <EditSliderModals
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/me-offer') ? (
            <QueensOfferModals
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/orders') ? (
            <OrderEditModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/offers') ? (
            <OfferEditModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/training') ? (
            <TrainingModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/trainee') ? (
            <TraineeEditModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/funds') ? (
            <FundEditModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/me') ? (
            <QueenEditModal
              setUpdateSpinner={setUpdateSpinner}
              data={modalEditData}
            />
          ) : location.pathname.startsWith('/questions') ? (
            <ReplyModal
              data={modalEditData}
              setUpdateSpinner={setUpdateSpinner}
            />
          ) : location.pathname.startsWith('/sellers') ? (
            <SellersEditModal
              data={modalEditData}
              setUpdateSpinner={setUpdateSpinner}
            />
          ) : location.pathname.startsWith('/queen-connect') ? (
            <EditQueenConnectModal
              data={modalEditData}
              setUpdateSpinner={setUpdateSpinner}
            />
          ) : (
            'aaa'
          )}
        </div>
      )}
    </>
  );
};

export default EditModal;
