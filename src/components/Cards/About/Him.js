import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const renderers = {
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      width="150"
      height="150"
      style={{ userSelect: 'none' }}
    />
  ),
};

const AboutMe = () => {
  const markdownContent = `
![Him](/images/pink.png)
`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className="card-content"
        style={{
          marginTop: '-40px',
          marginLeft: '-50px',
          marginRight: '-50px',
          marginBottom: '-40px',
        }}
      >
        <ReactMarkdown components={renderers}>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AboutMe;
