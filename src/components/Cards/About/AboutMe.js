import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../index.css';

const renderers = {
  img: ({ src, alt }) => <img src={src} alt={alt} width="200" height="200" />,
};

const AboutMe = () => {
  const markdownContent = `
# Hello 

I'm Onion, and this is my website. I studied computer science and mathematics at MIT, and currently work as a software engineer in Cambridge, MA.

I like to [make music](link-to-your-music) , [write software](link-to-your-software) , and [do stuff with paper](link-to-your-paper).

![Thumbnail Image](/images/thumbnail-gray.png)

You can email me [here](mailto:your-email@example.com).

My CV is [here](link-to-your-cv).
`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className="card-content"
        style={{
          marginTop: '-40px',
          marginLeft: '-35px',
          marginRight: '-35x',
          marginBottom: '-15px',
        }}
      >
        <ReactMarkdown components={renderers}>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AboutMe;
