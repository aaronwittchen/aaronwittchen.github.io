import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import contents from './data.ts';
import '../../../globals.css';

const ProgressReports = () => {
  const [currentId, setCurrentId] = useState(contents[contents.length - 1].id);

  const currentContent =
    contents.find((content) => content.id === currentId)?.text || '';

  const nextContent = () => {
    setCurrentId((prevId) => {
      const nextIndex =
        (contents.findIndex((content) => content.id === prevId) + 1) %
        contents.length;
      return contents[nextIndex].id;
    });
  };

  const previousContent = () => {
    setCurrentId((prevId) => {
      const currentIndex = contents.findIndex(
        (content) => content.id === prevId
      );
      const prevIndex = (currentIndex - 1 + contents.length) % contents.length;
      return contents[prevIndex].id;
    });
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className='card-content'
        style={{
          marginTop: '-30px',
          marginLeft: '-30px',
          marginRight: '-30px',
          marginBottom: '-20px', // '-10px'
        }}
      >
        <ReactMarkdown>{currentContent}</ReactMarkdown>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* 
        <button className="progress-button" onClick={previousContent}>
          Previous
        </button>

        <button className="progress-button" onClick={nextContent}>
          Next
        </button>
        */}
      </div>
    </div>
  );
};

export default ProgressReports;
