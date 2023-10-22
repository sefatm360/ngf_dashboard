import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import fetcher from '../../helpers/fetchApi';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const editorModule = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const editFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];
const CreateBlog = () => {
  const [writtedBlog, setwrittenBlog] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  console.log({ writtedBlog });

  const handleSubmit = async () => {
    if (!title) alert('Title is empty');
    if (!thumbnail) alert('Must select thumbnail photo');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', writtedBlog);
    formData.append('thumbnail', thumbnail);
    formData.append('author_name', 'Ontheway');

    const { data } = await fetcher.post({
      url: '/api/blog/post/admin',
      body: formData,
    });
    console.log(data);
    if (data.success) {
      alert('Blog posted successfully');
      setwrittenBlog('');
      setThumbnail(null);
      setTitle('');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div>
            <h2>Write a blog</h2>
            <button onClick={handleSubmit} className='button'>
              Post Blog
            </button>
          </div>
          <div>
            <label>
              <p>
                <strong>Post title:</strong>
              </p>
              <input
                style={{ width: '100%' }}
                type='text'
                placeholder='Enter post title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <p>
                <strong>Post thumbnail:</strong>
              </p>
              <input
                onChange={(e) => setThumbnail(e.target.files[0])}
                style={{ padding: '0' }}
                type='file'
                name='thumbnail'
                id='thumbnail'
              />
            </label>
          </div>
          <br />
          <div>
            <p>
              <strong>Post details:</strong>
            </p>
            <div className='quill-editor'>
              <div id='editor-container'>
                <ReactQuill
                  theme='snow'
                  value={writtedBlog}
                  onChange={setwrittenBlog}
                  modules={editorModule}
                  formats={editFormats}
                  placeholder='Write a blog...'
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateBlog;
