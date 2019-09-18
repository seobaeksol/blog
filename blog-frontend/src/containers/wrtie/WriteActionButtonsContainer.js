import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useDispatch, useSelector } from 'react-redux';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
  );

  const onPublish = () => {
    if (originalPostId)
      dispatch(updatePost({ id: originalPostId, title, body, tags }));
    else dispatch(writePost({ title, body, tags }));
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`);
    }

    if (postError) {
      console.log(postError);
    }
  }, [post, postError, history]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!originalPostId}
    />
  );
};

export default withRouter(WriteActionButtonsContainer);
