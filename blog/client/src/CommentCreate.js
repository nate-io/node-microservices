import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCommentsUrl } from './config';

export default function CommentCreate({ id }) {
  const [content, setContent] = useState('');

  const onChange = (e) => {
    const { value } = e.target;

    setContent(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(getCommentsUrl(id), { content });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="content" style={{ width: '100%' }}>
            Comment
            <input
              className="form-control"
              id="content"
              name="content"
              onChange={onChange}
              placeholder="Add a comment to this post"
              value={content}
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

CommentCreate.propTypes = {
  id: PropTypes.string.isRequired,
};
