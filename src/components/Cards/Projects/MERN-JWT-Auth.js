import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const renderers = {
  img: ({ src, alt }) => <img src={src} alt={alt} width='400' height='400' />,
  a: ({ href, children }) => (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  ),
  span: ({ style, children }) => <span style={style}>{children}</span>,
};

const MERNJWTAuth = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.loop = true;
  }, []);

  const markdownContent1 = `
# MERN JWT Authentication
`;

  const markdownContent2 = `
**MERN JWT Authentication is a full-stack, production-ready application built with MongoDB, Express, React, Node.js, and TypeScript, featuring JWT-based authentication.**  

![Auth Screenshot 1](/images/1.png)
![Auth Screenshot 2](/images/3.png)
`;

  const markdownContent3 = `
The backend implements secure [JWT authentication](https://jwt.io/) with access and refresh tokens, session management stored in [MongoDB](https://www.mongodb.com/), email verification using [Resend](https://resend.com/), password reset functionality, [rate limiting](https://expressjs.com/en/resources/middleware/rate-limit.html), security headers via [Helmet](https://helmetjs.github.io/), input validation with [Zod](https://github.com/colinhacks/zod), structured error handling, and full type safety using [TypeScript](https://www.typescriptlang.org/).

The frontend is built with [React 19](https://react.dev/) and [Vite](https://vitejs.dev/), styled using [Chakra UI](https://chakra-ui.com/) with a dark theme. It leverages [React Query](https://tanstack.com/query/latest) for server state management, [React Router v7](https://reactrouter.com/en/main) for protected routes, automatic token refresh, device-aware session tracking, and supports email verification and password reset flows. The interface is fully responsive and optimized for user experience across devices.

The project structure separates backend and frontend logic clearly. The backend includes configuration, controllers, middleware, models, routes, and services, with server startup managed via [Express](https://expressjs.com/). The frontend organizes reusable components, hooks, pages, and Chakra UI theme customization.

Key API endpoints include registration, login, logout, token refresh, email verification, and password reset, with protected routes for fetching user data and managing sessions. Public routes include login, registration, email verification, and password reset forms, while protected routes handle user profile and session management.

Security features include JWT token management, session tracking, password hashing with [bcrypt](https://www.npmjs.com/package/bcrypt), rate limiting, Helmet-based security headers, [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) protection, and Zod validation schemas. Deployment involves building backend and frontend, configuring production environment variables, and connecting to a MongoDB instance.  
`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className='card-content'
        style={{
          marginTop: '-40px',
          marginLeft: '-35px',
          marginRight: '-35px',
          marginBottom: '-15px',
        }}
      >
        <ReactMarkdown components={renderers}>{markdownContent1}</ReactMarkdown>
        <div style={{ marginTop: '10px', marginBottom: '15px' }}>
          <span style={{ fontSize: '14px', color: '#d3869b' }}>
            react, nodejs, express, mongodb, vite, chakra-ui, jwt, typescript
          </span>
        </div>
        <ReactMarkdown components={renderers}>{markdownContent2}</ReactMarkdown>
        <div
          className='border'
          style={{
            border: '0',
            height: '1px',
            backgroundColor: '#2c2c2c',
            margin: '22px auto',
            transition: 'background-color 0.3s ease',
          }}
        ></div>
        <ReactMarkdown components={renderers}>{markdownContent3}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MERNJWTAuth;
