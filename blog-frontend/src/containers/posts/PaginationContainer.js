import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';
import Pagination from '../../components/common/Pagination';

const PaginationContainer = ({ location }) => {
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POST'],
  }));

  if (!posts || loading) return null;

  const { tag, username, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PaginationContainer);
