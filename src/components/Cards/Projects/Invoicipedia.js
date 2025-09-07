import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const renderers = {
  img: ({ src, alt }) => <img src={src} alt={alt} width='900' height='600' />,
  a: ({ href, children }) => (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  ),
  span: ({ style, children }) => <span style={style}>{children}</span>,
};

const Invoicipedia = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.loop = true;
  }, []);

  const markdownContent1 = `
# Invoicipedia
`;

  const markdownContent2 = `
**A modern, full-stack invoicing application built with Next.js 15, featuring multi-currency support, Stripe payments, and professional email notifications.**  

**Available on [Github](https://github.com/aaronwittchen/invoicipedia)**  
**Live Page [here](https://invoicipedia-one.vercel.app/)**

![InvoiceImage](/images/InvoiceImage.png)
`;

  const markdownContent3 = `
Invoicipedia is a modern, full-stack invoicing application built with [Next.js 15](https://nextjs.org/) that allows users to create, edit, and track invoices using professional templates. It supports multiple currencies, including USD (\$) and EUR (€), with accurate formatting, and integrates with [Stripe](https://stripe.com/) for secure online payments. Users can manage customer information and billing details, track invoice statuses such as open, paid, void, or uncollectible, and receive automated email notifications powered by [Resend](https://resend.com/) when invoices are created. The platform offers secure login and signup functionality through [Clerk](https://clerk.com/) and supports multi-tenant organizations, ensuring data isolation between teams.

The application provides a user-friendly invoice creation workflow with form-based input and a comprehensive dashboard that includes pagination, filtering, and search capabilities for easy invoice management. Payment integration is seamless, with Stripe automatically updating invoice statuses after checkout. Professional, customizable email templates ensure customers receive polished communication, and the responsive design built with [Tailwind CSS](https://tailwindcss.com/) guarantees a smooth experience on any device.

Financial operations are handled precisely, converting amounts to cents for accuracy and supporting multiple currencies. Users can confidently track payment confirmations and manage the entire invoice lifecycle efficiently. Security is a core aspect of Invoicipedia, with server-side form validation, PCI-compliant Stripe payment processing, and Clerk-powered user authentication, along with organizational data separation for multi-tenant support.

From a technology perspective, the frontend leverages [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Radix UI](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/), and [Lucide React](https://lucide.dev/) for a modern and interactive user interface. The backend is built with [PostgreSQL](https://www.postgresql.org/) and [Drizzle ORM](https://orm.drizzle.team/) for robust and type-safe database management, with server actions handling business logic and API routes. Authentication and payment processing are handled by Clerk and Stripe, respectively, and email delivery is powered by Resend. Development is streamlined using tools like ESLint for code quality, Drizzle Kit for database migrations, React Email for templating, and PostCSS for CSS optimization.

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
            nextjs, react, typescript, tailwindcss, clerk, stripe
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

export default Invoicipedia;
