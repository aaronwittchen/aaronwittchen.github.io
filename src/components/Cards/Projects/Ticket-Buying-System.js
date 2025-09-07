import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const renderers = {
  img: ({ src, alt }) => <img src={src} alt={alt} width='1100' height='350' />,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  span: ({ style, children }) => <span style={style}>{children}</span>,
};

const TicketBuyingSystem = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.loop = true;
  }, []);

  const markdownContent1 = `
# Ticket Buying System
`;

  const markdownContent2 = `
**Ticket Buying System is a microservices-based ticket booking application** designed to handle event inventory management, ticket booking, and order processing. Built with Java 17 and Spring Boot 3, the system uses MySQL for persistence, Apache Kafka for event-driven communication, and Keycloak for OAuth2 JWT authentication. Metrics and monitoring are integrated using Prometheus and Grafana for visualization.

**Available on [Github](https://github.com/aaronwittchen/Ticket-Buying-System)**

![Ticket Buying System Diagram](/images/TicketBuyingSystemDiagram.png)
`;

  const markdownContent3 = `
The system provides real-time event inventory management, venue capacity tracking, and ticket booking creation, ensuring accurate inventory updates across services. Each service is independently deployable and integrates seamlessly using [Apache Kafka](https://kafka.apache.org/) events. It features circuit breakers with [Resilience4j](https://resilience4j.readme.io/), global exception handling, input validation via [Bean Validation](https://beanvalidation.org/), and [OpenAPI](https://www.openapis.org/) documentation for both individual services and aggregated API access through the [API Gateway](https://spring.io/guides/gs/routing-and-filtering/).

The architecture consists of four main components: the Inventory Service, Booking Service, Order Service, and an API Gateway. The Inventory Service manages events, tracks venue capacities, and updates inventory. The Booking Service handles ticket booking creation, publishing events to Kafka. The Order Service consumes these events and processes orders. The API Gateway routes requests, provides aggregated API documentation, and exposes health and metrics endpoints via [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html).

Starting the system requires running a [MySQL](https://www.mysql.com/) database, Kafka broker, and [Keycloak](https://www.keycloak.org/) authentication server. Each service can be started individually using Maven commands. Environment variables include MySQL credentials for database access.

API endpoints include event listings, venue information, event inventory retrieval, and capacity updates for the Inventory Service; booking creation for the Booking Service; and aggregated API access through the Gateway. Metrics and health endpoints are available for all services, allowing [Prometheus](https://prometheus.io/) to scrape metrics and [Grafana](https://grafana.com/) to visualize them.

Centralized API documentation is accessible via the API Gateway, with individual Swagger documentation for the Inventory and Booking Services, respectively.
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
            java, springboot, kafka, mySQL, prometheus, grafana, keycloak, microservices
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

export default TicketBuyingSystem;
