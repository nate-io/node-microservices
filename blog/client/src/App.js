import React from 'react';
import PostList from './PostList';
import PostCreate from './PostCreate';

const App = () => (
  <div className="container">
    <h1>Create Post</h1>
    <PostCreate />
    <PostList />
  </div>
);

export default App;
