import React, { useState, useEffect } from 'react';
import fetcher from '../../helpers/fetchApi';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const ShowCategory = ({ category, showSkills, setShowSkills, newSkill }) => {
  const { id, name } = category;
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/out/api/seller/get/all/skills/${id}`,
      });
      setSkills(data.data);
    })();
  }, []);

  useEffect(() => {
    if (Number(newSkill.categoryId) === id) {
      setSkills([...skills, { id: newSkill.id, name: newSkill.name }]);
    }
  }, [newSkill, id]);

  return (
    <div>
      <ul className='skill-category'>
        <li
          onClick={() => {
            if (showSkills === id) {
              setShowSkills(null);
            } else {
              setShowSkills(id);
            }
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {name} {showSkills === id ? <BiUpArrow /> : <BiDownArrow />}
          </span>
          {showSkills === id && (
            <ul>
              {skills.map((skill) => {
                const { id, name } = skill;
                return <li key={id}>{name}</li>;
              })}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ShowCategory;
