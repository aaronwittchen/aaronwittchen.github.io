import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../index.css';

const AboutThisWebsite = () => {
  const markdownContent = `

"Wow, what a great website".

Click on a folder in the files window to expand the directory; click on a file within a directory to open the content in a new (internal) window.  
You can drag, minimize, resize, and close the windows, like windows in a desktop environment. On mobile, the site behaves a bit differently, and probably more like you'd expect.

## Site Structure

The site is roughly designed to imitate a file browser. Files are organized by directory:

- **about**: Contains information about me and the site.
- **papers**: Contains papers I've contributed to.
- **posts**: Contains informative/technical writeups.
- **art**: Contains art that I've made, in one form or another.
- **projects**: Contains some things that I've worked on, mostly software stuff.

If you want to permalink anything on this site, just focus a window and the URL will change.

**Note:** This site is a work in progress; there are surely bugs. If you find any, shoot me an email.

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

export default AboutThisWebsite;
