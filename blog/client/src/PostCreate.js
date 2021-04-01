import axios from 'axios';
import { useState } from 'react';
import { getPostsUrl } from './config';

export default function PostCreate() {
  const [title, setTitle] = useState('');

  const onChange = (e) => {
    const { value } = e.target;

    setTitle(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(getPostsUrl(), { title });

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title" style={{ width: '100%' }}>
            Title
            <input
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              placeholder="Add a blog title"
              value={title}
            />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
