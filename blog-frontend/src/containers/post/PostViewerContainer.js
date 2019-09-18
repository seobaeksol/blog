import React, { useEffect } from 'react';
import PostViewer from '../../components/post/PostViewer';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/post';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOrinigalPost } from '../../modules/write';
import { deletePost } from '../../lib/api/posts';

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

  const onRemove = async () => {
    try {
      await deletePost(postId);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
      ownPost={user && post && post.user._id === user._id}
    />
  );
};

export default withRouter(PostViewerContainer);
