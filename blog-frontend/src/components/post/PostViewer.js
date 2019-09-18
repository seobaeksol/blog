import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({ post, loading, error }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>No Such Post.</PostViewerBlock>;
    }
    return <PostViewerBlock>Error Occured</PostViewerBlock>;
  }

  if (loading || !post) return null;

  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{post.title}</h1>
        <SubInfo
          hasMarginTop={true}
          username={post.username}
          publishedDate={post.publishedDate}
        />
        <Tags tags={post.tags} />
      </PostHead>
      <PostContent
        dangerouslySetInnerHTML={{
          __html: post.body,
        }}
      />
    </PostViewerBlock>
  );
};

export default PostViewer;
