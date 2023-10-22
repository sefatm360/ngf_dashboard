import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const CourseDetails = () => {
  const { id } = useParams();
  const [allTrainees, setAllTrainees] = useState({
    active: [],
    rejected: [],
    total: 0,
  });

  const [training, setTraining] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/otw-training/api/training/get-single/${id}`,
      });

      if (data.success) {
        setTraining(data.data);
      }

      const { data: trainingTrainee } = await fetcher.get({
        url: `/otw-training/api/training/get/all/trainee/of/training/${id}`,
      });

      if (trainingTrainee.success) {
        const { active, rejected } = trainingTrainee.data.reduce(
          (acc, curr) => {
            if (curr.status === 'Active') acc.active.push(curr);
            if (curr.status === 'Reject') acc.rejected.push(curr);

            return acc;
          },
          {
            active: [],
            rejected: [],
          }
        );
        setAllTrainees({ active, rejected, total: trainingTrainee.total });
      }
      setIsLoading(false);
    })();
  }, [id]);

  const traineeStatus = async (trainee_id, status) => {
    const result = await fetcher.put({
      url: `/otw-training/api/trainee/update/joined/trainee-and-training`,
      cType: 'application/json',
      body: { status, trainee_id: trainee_id, training_id: id },
    });

    if (result.status) {
      if (status === 'Active') {
        const { active, reject } = allTrainees.rejected.reduce(
          (prev, curr) => {
            if (curr.id === trainee_id) {
              curr.status = 'Active';
              prev.active.push(curr);
            } else {
              prev.reject.push(curr);
            }
            return prev;
          },
          { active: [], reject: [] }
        );

        setAllTrainees({
          active: [...allTrainees.active, ...active],
          rejected: reject,
          total: allTrainees.total,
        });
      } else {
        const { active, reject } = allTrainees.active.reduce(
          (prev, curr) => {
            if (curr.id === trainee_id) {
              curr.status = 'Reject';
              prev.reject.push(curr);
            } else {
              prev.active.push(curr);
            }
            return prev;
          },
          { active: [], reject: [] }
        );

        setAllTrainees({
          rejected: [...allTrainees.rejected, ...reject],
          active: active,
          total: allTrainees.total,
        });
      }
    }
  };

  const lists = [
    { data: allTrainees.active, title: 'Active' },
    { data: allTrainees.rejected, title: 'Rejected' },
  ];

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='course-details'>
          <div className='course-thumbnail'>
            <h3>Course: {training.title}</h3>
            <div
              style={{ marginTop: '10px' }}
              className='form-image-containers'
            >
              <div className='form-image-container'>
                <img
                  className='form-image'
                  src={`${url}/get/image/training_thumbnail/${training.thumbnail}`}
                  alt=''
                />
              </div>
            </div>
          </div>
          <div>
            <div className='edit-btn-wrapper'>
              <div>
                <p>
                  <span className='details-heading'>Status:</span>{' '}
                  {training.status}
                </p>
                <p>
                  <span className='details-heading'>Course Date:</span> {}
                  {moment(training.training_date).format('MMM Do YY')}
                </p>
                <p>
                  <span className='details-heading'>Time:</span>{' '}
                  {moment(training.time, 'HHmm').format('h:mm a')}
                </p>
                <p>
                  <span className='details-heading'>Trainer:</span>{' '}
                  {training.trainer_name}
                </p>
              </div>
              <div>
                <button
                  onClick={() =>
                    adminDispatch({
                      type: SHOW_MODAL,
                      payload: {
                        modal: 'Edit Course',
                        training,
                        setTraining,
                      },
                    })
                  }
                  className='button'
                >
                  Edit Course
                </button>
              </div>
            </div>
            <div className='course-info'>
              <span>
                <span className='details-heading'>Details:</span>{' '}
                {training.details}
              </span>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className='card-header'>
          <h3>Trainee Applied {allTrainees.total}</h3>
        </div>
        <div className='recent-grid queen-list-page'>
          {lists?.map((item) => {
            const { data, title } = item;
            return (
              <div className='customers' key={title}>
                <div className='card'>
                  <div className='card-header'>
                    <h3>{title} Trainees for this training</h3>
                    <h3>Total= {data.length}</h3>
                  </div>
                  <div className='card-body'>
                    {!isLoading ? (
                      <>
                        {data ? (
                          <>
                            {data.map((item) => {
                              const {
                                id,
                                photo,
                                name,
                                phone,
                                reg_date,
                                status,
                              } = item;
                              return (
                                <div key={id} className='customer'>
                                  <Link to={`/trainee/details/${id}`}>
                                    <div className='info'>
                                      {photo ? (
                                        <img
                                          src={`${url}/get/image/training_trainee_files/${photo}`}
                                          width='40px'
                                          height='40px'
                                          alt='queen'
                                        />
                                      ) : (
                                        <img
                                          src='/assets/avatar.jpg'
                                          width='40px'
                                          height='40px'
                                          alt=''
                                          style={{ borderRadius: '50%' }}
                                        />
                                      )}

                                      <div>
                                        <div
                                          style={{
                                            display: 'flex',
                                            gap: '5px',
                                          }}
                                        >
                                          <h4>{name}</h4>
                                          <small>({phone})</small>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                          <h4>Joined: </h4>
                                          <small>
                                            {' ' +
                                              moment(reg_date).format(
                                                'MMM Do YY'
                                              )}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                  <div>
                                    {status === 'Reject' && (
                                      <div>
                                        <button
                                          className='trainee-btn'
                                          onClick={() =>
                                            traineeStatus(id, 'Active')
                                          }
                                        >
                                          Reactive
                                        </button>
                                      </div>
                                    )}
                                    {status === 'Active' && (
                                      <div>
                                        <button
                                          className='trainee-btn cursor'
                                          onClick={() =>
                                            traineeStatus(id, 'Reject')
                                          }
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <h3 className='spinner'>No {title} Queen</h3>
                        )}
                      </>
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
