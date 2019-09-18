import React, { useEffect } from 'react';
import PostList from '../../components/posts/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../modules/posts';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PostListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, user, error, loading } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      user: user.user,
      loading: loading['posts/LIST_POSTS'],
    }),
  );

  useEffect(() => {
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default withRouter(PostListContainer);
