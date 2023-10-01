import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['code-block'],
    [{ 'align': [] }],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image',
  'code-block',
  'align'
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();

    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Create Post</h1>
      <form onSubmit={createNewPost}>
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-4"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-4"
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />

        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 mb-4"
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
        />

        <ReactQuill
          className="border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />

        <button className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring focus:border-blue-300" type="submit">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
