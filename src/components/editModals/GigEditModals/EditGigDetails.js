import React, { useReducer, useEffect, useState } from 'react';
import { useAdminContext } from '../../../contexts/adminContext';
import { HIDE_MODAL } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';
import { SET_INITIAL_STATE, SET_SINGLE_VALUE } from '../editModalConstants';
import reducer from '../editModalReducers/modalReducer';
import { AiFillCloseCircle } from 'react-icons/ai';
import ShowSkillsForEdit from '../../AddSkillsComponents/ShowSkillsForEdit';

const EditGigDetails = ({ setUpdateSpinner, gigDetails, setGigDetails }) => {
  const [nowSkills, setNowSkills] = useState(gigDetails.skills);
  const [skills, setSkills] = useState([]);
  const [state, dispatch] = useReducer(reducer, {});
  const { dispatch: adminDispatch } = useAdminContext();
  const [category, setCategory] = useState(gigDetails.skill_category_id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: '/out/api/seller/get/all/skill-categories',
      });
      setCategories(data.data);
    })();
    dispatch({
      type: SET_INITIAL_STATE,
      payload: {
        title: gigDetails.title,
        description: gigDetails.description,
        pf_link: gigDetails.pf_link,
        status: gigDetails.status,
        price: gigDetails.price,
        d_time: gigDetails.d_time,
        d_time_type: gigDetails.d_time_type,
        skill_category_id: gigDetails.skill_category_id,
      },
    });

    setNowSkills(gigDetails.skills);
  }, [gigDetails]);

  const { title, description, pf_link, status, price, d_time, d_time_type } =
    state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    if (nowSkills.length) {
      if (gigDetails.skills !== nowSkills) {
        const skillsForUpdate = [];
        nowSkills.forEach((item) => {
          skillsForUpdate.push(item.id);
        });
        state.skills = skillsForUpdate;
      }
      state.skill_category_id = Number(category);
      const data = await fetcher.put({
        url: `/out/api/admin/gig/update/${gigDetails.gig_id}`,
        cType: 'application/json',
        body: state,
      });
      if (data.status === 200) {
        Object.keys(state).forEach((item) => {
          gigDetails[item] = state[item];
        });
        gigDetails['skills'] = nowSkills;
        setGigDetails(gigDetails);
        setUpdateSpinner(false);
        adminDispatch({ type: HIDE_MODAL });
      } else {
        setUpdateSpinner(false);
      }
    } else {
      alert('Please Add some skills');
    }
  };

  const handleRemoveSkills = (id) => {
    const newSkills = nowSkills.filter((skill) => skill.id !== id);
    const removedSkills = nowSkills.find((skill) => skill.id === id);
    setNowSkills(newSkills);
    setSkills([...skills, removedSkills]);
  };

  const handleAddSkills = (skill) => {
    setNowSkills([...nowSkills, skill]);
    const newSkills = skills.filter((a) => a.id !== skill.id);
    setSkills(newSkills);
  };
  return (
    <div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Her skills</span>
        <br />
        {nowSkills.length ? (
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 3px',
              backgroundColor: 'white',
            }}
          >
            {nowSkills.map((skill) => {
              const { id, name } = skill;
              return (
                <li className='single-skill' key={id}>
                  {name}{' '}
                  <AiFillCloseCircle onClick={() => handleRemoveSkills(id)} />
                </li>
              );
            })}
          </ul>
        ) : (
          <small style={{ color: 'red' }}>no skills added!</small>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='first-row'>
          <label htmlFor='title'>
            <span>Gig Title</span>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='Gig Name'
              style={{ width: 'auto' }}
              value={title || ''}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'title', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='pf_link'>
            <span>Portfolio Link</span>
            <input
              type='text'
              id='pf_link'
              name='pf_link'
              placeholder='Portfolio Link'
              style={{ width: 'auto' }}
              value={pf_link || ''}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'pf_link', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='price'>
            <span>Gig Price</span>
            <input
              type='text'
              id='price'
              name='price'
              placeholder='Gig Price'
              style={{ width: 'auto' }}
              value={price || ''}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'price', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='status'>
            <span>Status</span>
            <select
              id='status'
              name='status'
              style={{ width: 'auto' }}
              value={status || ''}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'status', value: e.target.value },
                })
              }
            >
              <option value='Approved'>Approved</option>
              <option value='Pending'>Pending</option>
              <option value='Rejected'>Rejected</option>
            </select>
          </label>

          <label htmlFor='d_time_type'>
            <span>Type</span>
            <select
              id='d_time_type'
              name='d_time_type'
              style={{ width: 'auto' }}
              value={d_time_type || ''}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'd_time_type', value: e.target.value },
                })
              }
            >
              <option value='hour'>Hour</option>
              <option value='day'>Day</option>
              <option value='week'>Week</option>
              <option value='month'>Month</option>
            </select>
          </label>

          <label htmlFor='d_time'>
            <span>Time</span>
            <input
              type='text'
              id='d_time'
              name='d_time'
              placeholder='Time'
              style={{ width: 'auto' }}
              value={d_time || 0}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'd_time', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='skill_category_id'>
            <span>Skill category</span>
            <select
              id='skill_category_id'
              name='skill_category_id'
              style={{ width: 'auto' }}
              value={category || ''}
              onChange={(e) => {
                setCategory(e.target.value);
                setNowSkills([]);
              }}
            >
              {categories.map((category) => {
                const { id, name } = category;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          <ShowSkillsForEdit
            category={{
              categoryId: category,
              categoryName: 'Skills',
            }}
            nowSkills={nowSkills}
            skills={skills}
            setSkills={setSkills}
            handleAddSkills={handleAddSkills}
          />

          <label htmlFor='description'>
            <span>Description</span>
            <textarea
              id='description'
              name='description'
              rows='7'
              cols='50'
              placeholder='Description'
              style={{ width: 'auto' }}
              value={description || ''}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'description', value: e.target.value },
                })
              }
            />
          </label>
        </div>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default EditGigDetails;
