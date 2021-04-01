import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  return <pre style={{ marginTop: '100px' }}>{JSON.stringify(posts, null, 2)}</pre>;
}
