import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const renderers = {
  img: ({ src, alt }) => <img src={src} alt={alt} width='950' height='300' />,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  span: ({ style, children }) => <span style={style}>{children}</span>,
};

const NeoWsTrackingApplication = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.loop = true;
  }, []);

  const markdownContent1 = `
# NeoWs Tracking Application
`;

  const markdownContent2 = `
**NeoWs Tracking Application is a Near-Earth Object (NEO) monitoring and alerting system built with Spring Boot.**  
It tracks potentially hazardous asteroids using NASA's NeoWs API and sends real-time email notifications to registered users.

**Available on [Github](https://github.com/aaronwittchen/NeoWs-Tracking-Application)** 

![NeoWs Architecture Diagram](/images/NeoWs%20Architecture%20Diagram.png)
`;

  const markdownContent3 = `
The application continuously monitors asteroids in real-time, detects hazardous objects, and publishes events via [Apache Kafka](https://kafka.apache.org/) for asynchronous processing. Users can register, manage preferences, and receive alerts via email. NeoWs Tracking employs a microservices architecture, with separate Asteroid and Email Notification services communicating through Kafka. The system persists user and notification data in [MySQL](https://www.mysql.com/), exposes REST APIs documented with [OpenAPI/Swagger](https://swagger.io/), and supports scheduled monitoring with robust error handling and logging.

The NeoWs Service fetches asteroid data, detects hazards, and publishes alerts to Kafka, while the Email Notification Service consumes events, stores information, and sends email alerts using Java Mail Sender. The infrastructure includes Kafka for event streaming, MySQL for persistence, and Kafka UI for monitoring events.  

Built with [Java 21](https://openjdk.org/), Spring Boot 3.x, Spring Data JPA, and Docker Compose, the system leverages Lombok for boilerplate reduction and provides comprehensive health checks for both services. Monitoring is accessible through Kafka UI and health endpoints for NeoWs and the Email service.  

REST API endpoints allow registration, listing, updating, and triggering alerts for users, while Swagger provides interactive API documentation. The scheduled workflow fetches 7-day asteroid data, filters hazardous objects, publishes Kafka events, and delivers timely email alerts to subscribed users.  
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
            Java, Spring Boot, Apache Kafka, MySQL, Docker, Swagger
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

export default NeoWsTrackingApplication;
