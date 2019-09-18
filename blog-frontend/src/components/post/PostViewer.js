import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

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

const SubInfo = styled.div`
  margin-top: 1rem;
  span + span:before {
    color: ${palette.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${palette.cyan[6]};
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
        <SubInfo>
          <span>
            <b>{post.user.username}</b>
          </span>
          <span>{post.publishedDate}</span>
        </SubInfo>
        <Tags>
          {post.tags.map(t => (
            <div className="tag">#{t}</div>
          ))}
        </Tags>
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
