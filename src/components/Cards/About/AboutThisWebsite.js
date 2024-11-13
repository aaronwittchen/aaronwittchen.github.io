import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const AboutThisWebsite = () => {
  const markdownContent = `

"Wow, what a great website".

Click on a folder in the files window to expand the directory; click on a file within a directory to open the content in a new (internal) window.  
You can drag, minimize, resize (buggy!), and close the windows, like windows in a desktop environment. The site is not designed for mobile view,   
so it will probably not behave like you'd expect.

## Site Structure

The site is roughly designed to imitate a file browser. Files are organized by directory:

- **about**: Contains information about me and the site.
- **posts**: Contains informative/technical writeups (will be moved to a different site).
- **music**: Contains music that i like (implementing the spotify API soon).
- **art**: Contains art that I've made, in one form or another.

Soon i will implement the following:
- **projects**: Sharing some things that I've worked on, mostly software stuff.
- **permalinks**: Changing the URL based on the focused URL.
- **hosting**: trying to work on a good hosting solution.

**Note:** This site is a work in progress, **there are bugs**.  
If you find any, please ignore them :D

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
