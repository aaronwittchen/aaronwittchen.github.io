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
![Hon](/images/hon_fish.jpg)
`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className="card-content"
        style={{
          marginTop: '-45px',
          marginLeft: '-50px',
          marginRight: '-50px',
          marginBottom: '-55px',
        }}
      >
        <ReactMarkdown components={renderers}>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AboutMe;
