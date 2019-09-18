import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/wrtie/EditorContainer';
import TagBoxContainer from '../containers/wrtie/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/wrtie/WriteActionButtonsContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
