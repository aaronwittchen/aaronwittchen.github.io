import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const renderers = {
  img: ({ src, alt }) => <img src={src} alt={alt} width="200" height="200" />,
};

const AboutMe = () => {
  const markdownContent = `
# Hello 

I'm LocalOnionSeller, or Onion for short, but I'm known by many names, and this is my website.  

I studied computer science and mathematics in Germany, and I'm currently trying to make it as a software engineer.

I like to [work on coding projects](#) , [write down my thoughts](#) , and [make generative art](#).

![Thumbnail Image](./images/thumbnail-gray.png)

My Discord: localonionseller (send me pics of your pets)  
My Matrix: [localonionseller](https://matrix.to/#/@localonionseller:matrix.org) (i wont answer)(probably)  
My Mastodon: [localonionseller](https://mstdn.social/@localonionseller)  

I also [rate music](https://www.albumoftheyear.org/user/onionseller)
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
