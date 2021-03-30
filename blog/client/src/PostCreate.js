import axios from 'axios';
import { useState } from 'react';

const POSTS_ENDPOINT = 'http://localhost:4000/posts/';

export default function PostCreate() {
  const [title, setTitle] = useState('');

  const onChange = (e) => {
    const { value } = e.target;

    setTitle(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(POSTS_ENDPOINT, { title });

    setTitle('');
  };

  return (
    <div>
      <form>
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
        <button
          className="btn btn-primary"
          onClick={onSubmit}
          type="button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
