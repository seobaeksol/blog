import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const Tags = ({ tags }) => {
  return (
    <TagsBlock>
      {tags &&
        tags.map(t => (
          <div key={t} className="tag">
            #{t}
          </div>
        ))}
    </TagsBlock>
  );
};

export default Tags;
