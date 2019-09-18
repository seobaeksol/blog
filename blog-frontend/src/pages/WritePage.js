import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/wrtie/EditorContainer';
import TagBoxContainer from '../containers/wrtie/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/wrtie/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>Write Post - REACTERS</title>
      </Helmet>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
