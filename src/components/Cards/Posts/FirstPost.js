import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../index.css';

const FirstPost = () => {
  const markdownContent = `

First Post AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

First Post AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className="card-content"
        style={{
          marginTop: '-30px',
          marginLeft: '-30px',
          marginRight: '-30px',
          marginBottom: '-10px',
        }}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default FirstPost;
