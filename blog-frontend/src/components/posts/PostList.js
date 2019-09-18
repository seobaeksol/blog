import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WrtiePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;
const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }

  p {
    margin-top: 2rem;
  }
`;

const PostItem = ({ post }) => {
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${post.user.username}/${post._id}`}>{post.title}</Link>
      </h2>
      <SubInfo
        username={post.user.username}
        publishedDate={post.publishedDate}
        hasMarginTop
      />
      <Tags tags={post.tags} />
      <p>{post.body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, showWriteButton, loading, error }) => {
  if (error) {
    return <PostListBlock>Error Occured</PostListBlock>;
  }

  return (
    <PostListBlock>
      {showWriteButton && (
        <WrtiePostButtonWrapper>
          <Button cyan to="/write">
            Write New Post
          </Button>
        </WrtiePostButtonWrapper>
      )}
      <div>
        {!loading &&
          posts &&
          posts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
    </PostListBlock>
  );
};

export default PostList;
