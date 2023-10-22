import React, { useState, useEffect } from 'react';
import fetcher from '../../helpers/fetchApi';

const ShowSkillsForEdit = ({
  category,
  nowSkills,
  setSkills,
  skills,
  handleAddSkills,
}) => {
  const { categoryId, categoryName } = category;

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/out/api/seller/get/all/skills/${Number(categoryId)}`,
      });

      if (data.success) {
        nowSkills.forEach((nowSkill) => {
          data.data.forEach((skill) => {
            if (skill.id === nowSkill.id) {
              const index = data.data.indexOf(skill);
              data.data.splice(index, 1);
            }
          });
        });
        setSkills(data.data);
      }
    })();
  }, [categoryId]);

  return (
    <div>
      <ul className='skill-category'>
        <li>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {categoryName}
          </span>
          <ul>
            {skills.length ? (
              <>
                {skills.map((skill) => {
                  const { id, name } = skill;
                  return (
                    <li className='skill-for-add' key={id}>
                      {name}{' '}
                      <button onClick={() => handleAddSkills(skill)}>
                        add
                      </button>
                    </li>
                  );
                })}
              </>
            ) : (
              <li>No skill in this category!</li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ShowSkillsForEdit;
