import React from 'react';
import Responsive from '../components/common/Responsive';
import WriteActionButtons from '../components/write/WriteActionButtons';
import EditorContainer from '../containers/wrtie/EditorContainer';
import TagBoxContainer from '../containers/wrtie/TagBoxContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;
