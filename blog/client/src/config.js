const POSTS_ENDPOINT = 'http://localhost:4000/posts/';
const COMMENTS_ENDPOINT_PARTS = [
  'http://localhost:4001/posts/',
  '/comments',
];

export function getPostsUrl() { return POSTS_ENDPOINT; }

export function getCommentsUrl(id) {
  return `${COMMENTS_ENDPOINT_PARTS[0]}${id}${COMMENTS_ENDPOINT_PARTS[1]}`;
}
