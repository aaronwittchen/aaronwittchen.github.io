import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../index.css';

const renderers = {
  img: ({ src, alt }) => <img src={src} alt={alt} width="400" height="400" />,
};

const Music = () => {
  const markdownContent = `
  ‎ Albums i like :D  
  ‎ One day i will use the Spotify API to show my recently listened songs on here. 

  ![Violator](https://www.depechemode.de/wp-content/uploads/2011/06/depeche-mode-violator.jpg)
  ![Late Registration](https://m.media-amazon.com/images/I/718khrgr5bL._UF1000,1000_QL80_.jpg)
  ![UTOPIA](https://m.media-amazon.com/images/I/51nMgSxPQeL._UF1000,1000_QL80_.jpg)  
  ![A Thousand Suns](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7dff0c84-b740-4213-b644-b6c89afbb5bf/deaa4df-bd08418b-ef88-4162-9f13-18b057f80281.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdkZmYwYzg0LWI3NDAtNDIxMy1iNjQ0LWI2Yzg5YWZiYjViZlwvZGVhYTRkZi1iZDA4NDE4Yi1lZjg4LTQxNjItOWYxMy0xOGIwNTdmODAyODEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.neqCmMIGZ_gR-sVsluyx1I9-uz7DI8uTS6Sl0z8nz_Q)
  ![Beerbongs & Bentleys](https://m.media-amazon.com/images/I/81DzVOtW+kL._UF1000,1000_QL80_.jpg)
  ![DEMAGOG](https://cdns-images.dzcdn.net/images/cover/ff9e647bb9ce59ab726fbf899b2703cb/0x1900-000000-80-0-0.jpg)
  `;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className="card-content"
        style={{
          marginTop: '-30px',
          marginLeft: '-50px',
          marginRight: '-50px',
          marginBottom: '-54px',
        }}
      >
        <ReactMarkdown components={renderers}>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Music;
