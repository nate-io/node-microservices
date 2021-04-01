import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import { getPostsUrl } from './config';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(getPostsUrl());

      setPosts(data);
    };

    fetchPosts();
  }, [setPosts]);

  const renderPosts = () => {
    const postsArray = Object.keys(posts);

    return postsArray.map((postId, index) => {
      const post = posts[postId];
      const isOffset = index !== 0 && index % 2 !== 0;

      return (
        <div
          className={`col-5 ${isOffset ? 'offset-1' : ''} card border-primary no-gutters`}
          style={{ marginTop: '20px', paddingLeft: '0', paddingRight: '0' }}
          key={postId}
        >
          <div className="card-header bg-primary text-white">
            <div className="text-white">
              <h2>{post.title}</h2>
            </div>
          </div>
          <div className="card-body">
            <CommentList id={post.id} />
            <CommentCreate id={post.id} />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <div className="row">
        {renderPosts()}
      </div>
    </div>
  );
}
