import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const AboutThisWebsite = () => {
  const markdownContent = `

"Wow, what a great website".

Navigate by clicking on folders in the file browser to expand directories, then click on individual files to open their content in new windows. 

The interface features draggable, resizable, and minimizable windows that function similarly to a desktop environment. Please note that this site is optimized for desktop viewing and may not display properly on mobile devices.

## Site Navigation

This website is designed as an interactive file browser with content organized into the following directories:

- **about**: Personal information and site details
- **posts**: Technical articles and informative content  
- **projects**: Software development work and other projects
- **art**: Creative works and artistic content

*Please note: This site is currently under development and you may encounter occasional bugs or incomplete features.*
`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className='card-content'
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
