import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import TrainingLists from '../../components/listsComponents/TrainingLists';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import CourseDetails from '../detailsPage/CourseDetails';
import TrainerDetails from '../detailsPage/TrainerDetails';
import TrainingMeeting from '../otherPages/TrainingMeeting';

const Training = () => {
  const [trainers, setTrainers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { dispatch: adminDispatch } = useAdminContext();

  const allFetch = [
    {
      url: '/otw-training/api/trainer/get/all?limit=100&skip=0',
      setData: setTrainers,
    },
    {
      url: '/otw-training/api/training/get/all?limit=100&skip=0',
      setData: setTrainings,
    },
    { url: '/otw-training/api/institute/get/all', setData: setInstitutes },
  ];

  useEffect(() => {
    allFetch.forEach(async (item) => {
      const { url, setData } = item;
      const { data } = await fetcher.get({ url });
      if (data.success) {
        setData(data.data);
      }
    });
    setFetching(false);
  }, []);

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  {fetching ? (
                    <Spinner />
                  ) : (
                    <div>
                      <div className='card-header'>
                        <h1 className='page-header-title'>Training Page</h1>
                        <Link className='button' to='/training/meetings'>
                          Meetings
                        </Link>
                      </div>
                      <div>
                        <div className='card-header'>
                          <h3>Institutes</h3>
                          <button
                            onClick={() =>
                              adminDispatch({
                                type: SHOW_MODAL,
                                payload: {
                                  modal: 'Add New Institute',
                                  institutes,
                                  setInstitutes,
                                },
                              })
                            }
                            className='button'
                          >
                            Add New Institute
                          </button>
                        </div>
                        <table width='100%'>
                          <thead>
                            <tr>
                              <td>ID</td>
                              <td>Image</td>
                              <td>Name</td>
                              <td>Location</td>
                              <td>Action</td>
                            </tr>
                          </thead>
                          <tbody>
                            {institutes.map((item) => {
                              const { inst_name, inst_logo, id, location } =
                                item;
                              return (
                                <tr key={id}>
                                  <td>{id}</td>
                                  <td>
                                    <img
                                      width={50}
                                      height={50}
                                      className='rounded-circle'
                                      src={`${url}/get/image/training_institutes/${inst_logo}`}
                                      alt=''
                                    />
                                  </td>
                                  <td>{inst_name}</td>
                                  <td>{location}</td>
                                  <td>
                                    <button className='button'>Edit</button>{' '}
                                    <button className='button'>Delete</button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <br />
                      <div>
                        <div className='card-header'>
                          <h3>Trainers</h3>
                          <button
                            onClick={() =>
                              adminDispatch({
                                type: SHOW_MODAL,
                                payload: {
                                  modal: 'Add New Trainer',
                                  trainers,
                                  setTrainers,
                                },
                              })
                            }
                            className='button'
                          >
                            Add New Trainer
                          </button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                          <table width='100%'>
                            <thead>
                              <tr>
                                <td>ID</td>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Phone</td>
                                <td>View</td>
                              </tr>
                            </thead>
                            <tbody>
                              {trainers.map((trainer) => (
                                <TrainingLists
                                  key={trainer.id}
                                  folder='training_trainer_files'
                                  route='/training/trainer'
                                  train={trainer}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <br />
                      <div>
                        <div className='card-header'>
                          <h3>Trainings</h3>
                          <button
                            onClick={() =>
                              adminDispatch({
                                type: SHOW_MODAL,
                                payload: {
                                  modal: 'Add New Course',
                                  trainings,
                                  setTrainings,
                                },
                              })
                            }
                            className='button'
                          >
                            Create New Training
                          </button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                          <table width='100%'>
                            <thead>
                              <tr>
                                <td>ID</td>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Status</td>
                                <td>View</td>
                              </tr>
                            </thead>
                            <tbody>
                              {trainings.map((training) => {
                                const {
                                  id,
                                  title,
                                  thumbnail,
                                  training_date,
                                  time,
                                  status,
                                } = training;
                                return (
                                  <tr key={id}>
                                    <td>{id}</td>
                                    <td>
                                      <img
                                        width={50}
                                        height={50}
                                        className='rounded-circle'
                                        src={`${url}/get/image/training_thumbnail/${thumbnail}`}
                                        alt=''
                                      />
                                    </td>
                                    <td>{title}</td>
                                    <td>
                                      {moment(training_date).format(
                                        'MMM Do YY'
                                      )}
                                    </td>
                                    <td>
                                      {moment(time, 'HHmm').format('h:mm a')}
                                    </td>
                                    <td>{status}</td>
                                    <td>
                                      <Link to={`/training/${id}`}>View</Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              }
            />
            <Route path='/:id' element={<CourseDetails />} />
            <Route path='/trainer/:id' element={<TrainerDetails />} />
            <Route path='/meetings' element={<TrainingMeeting />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Training;
