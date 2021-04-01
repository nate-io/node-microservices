import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCommentsUrl } from './config';

export default function CommentList({ id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(getCommentsUrl(id));

      setComments(data);
    };

    fetchComments();
  }, [setComments]);

  return (
    <ul>
      {comments.map((comment) => <li key={comment.id}>{comment.content}</li>)}
    </ul>
  );
}

CommentList.propTypes = {
  id: PropTypes.string.isRequired,
};
