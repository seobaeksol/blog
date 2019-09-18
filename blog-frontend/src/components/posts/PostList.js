import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

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

const PostItem = () => {
  return (
    <PostItemBlock>
      <h2>Title</h2>
      <SubInfo
        username={'username'}
        publishedDate={new Date().toLocaleDateString()}
      />
      <Tags tags={['tag1', 'tag2', 'tag3']} />
    </PostItemBlock>
  );
};

const PostList = () => {
  return (
    <PostListBlock>
      <WrtiePostButtonWrapper>
        <Button cyan to="/write">
          Write New Post
        </Button>
      </WrtiePostButtonWrapper>
      <div>
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
      </div>
    </PostListBlock>
  );
};

export default PostList;
