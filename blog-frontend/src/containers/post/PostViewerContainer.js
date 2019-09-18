import React, { useEffect } from 'react';
import PostViewer from '../../components/post/PostViewer';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/post';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOrinigalPost } from '../../modules/write';

const PostViewerContainer = ({ history, match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, loading, error, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));

    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOrinigalPost(post));
    history.push('/write');
  };

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} />}
      onwPost={user && user.id === post && post.id}
    />
  );
};

export default withRouter(PostViewerContainer);
