import axios from 'axios';
import React, { useEffect, useState } from 'react';

const POSTS_ENDPOINT = 'http://localhost:4000/posts/';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(POSTS_ENDPOINT);

      setPosts(data);
    };

    fetchPosts();
  }, [setPosts]);

  return <pre style={{ marginTop: '100px' }}>{JSON.stringify(posts, null, 2)}</pre>;
}
