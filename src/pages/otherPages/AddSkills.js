import React, { useState, useEffect } from 'react';
import ShowCategory from '../../components/AddSkillsComponents/ShowCategory';
import fetcher from '../../helpers/fetchApi';
import { MdOutlineDownloadDone } from 'react-icons/md';

const AddSkills = () => {
  const [categories, setCategories] = useState([]);
  const [showSkills, setShowSkills] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [category, setCategory] = useState('');
  const [skill, setSkill] = useState('');
  const [newSkill, setNewSkill] = useState({});
  const [successMassage, setSuccessMassage] = useState({
    category: '',
    skills: '',
  });
  const [isLoading, setIsLoading] = useState({
    category: false,
    skills: false,
  });

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: '/out/api/seller/get/all/skill-categories',
      });
      setCategories(data.data);
    })();
  }, []);

  if (successMassage.category || successMassage.skills) {
    setTimeout(() => {
      setSuccessMassage({ category: '', skills: '' });
    }, 5000);
  }

  const HandleAddCategory = async () => {
    if (category) {
      setIsLoading({ ...isLoading, category: true });
      const { data } = await fetcher.post({
        url: '/out/api/admin/add/skill-category',
        cType: 'application/json',
        body: { name: category },
      });
      if (data.success) {
        setSuccessMassage({
          ...successMassage,
          category: 'Category successfully added',
        });
        setCategories([...categories, { id: data.data, name: category }]);
        setCategory('');
        setIsLoading({ ...isLoading, category: false });
      } else {
        setIsLoading({ ...isLoading, category: false });
      }
    } else {
      alert('Enter Category Name');
    }
  };

  const HandleAddSkills = async () => {
    if (categoryId && skill) {
      setIsLoading({ ...isLoading, skills: true });
      const { data } = await fetcher.post({
        url: '/out/api/admin/add/skill',
        cType: 'application/json',
        body: { name: skill, category_id: categoryId },
      });
      if (data.success) {
        setSkill('');
        setSuccessMassage({
          ...successMassage,
          skills: 'Skill successfully added',
        });
        setNewSkill({ id: data.data, name: skill, categoryId });
        setIsLoading({ ...isLoading, skills: false });
      }
    } else {
      setIsLoading({ ...isLoading, skills: false });
      alert('Please Select Category First');
    }
  };

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div>
            <h1>Add Skills</h1>
          </div>
          <div style={{ display: 'flex' }}>
            <div>
              <div className='first-row'>
                <label htmlFor='category'>
                  <span>Add Category</span>
                  {successMassage.category && (
                    <small className='success-massage'>
                      <MdOutlineDownloadDone /> {successMassage.category}
                    </small>
                  )}
                  <input
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: 'auto' }}
                    name='category'
                    id='category'
                    type='text'
                    placeholder='Enter category name'
                    value={category}
                  />
                </label>
              </div>
              {isLoading.category ? (
                <button className='button'>Adding..</button>
              ) : (
                <button onClick={HandleAddCategory} className='button'>
                  Add Category
                </button>
              )}
            </div>
            <div>
              <div className='first-row'>
                <label htmlFor='select_category'>
                  <span>Select Category</span>
                  <select
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{ width: 'auto' }}
                    name='select_category'
                    id='select_category'
                    defaultValue=''
                  >
                    <option value='' disabled hidden>
                      Select Category
                    </option>
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
                <label htmlFor='skill'>
                  <span>Add Skill</span>
                  {successMassage.skills && (
                    <small className='success-massage'>
                      <MdOutlineDownloadDone /> {successMassage.skills}
                    </small>
                  )}
                  <input
                    onChange={(e) => setSkill(e.target.value)}
                    style={{ width: 'auto' }}
                    name='skill'
                    id='skill'
                    type='text'
                    placeholder='Enter skill name'
                    value={skill}
                  />
                </label>
              </div>
              {isLoading.skills ? (
                <button className='button'>Adding..</button>
              ) : (
                <button onClick={HandleAddSkills} className='button'>
                  Add
                </button>
              )}
            </div>
          </div>
          <div style={{ marginTop: '50px' }}>
            <span style={{ fontWeight: 'bold' }}>Category List</span>
            <div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <ShowCategory
                    setShowSkills={setShowSkills}
                    showSkills={showSkills}
                    key={category.id}
                    category={category}
                    newSkill={newSkill}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSkills;
