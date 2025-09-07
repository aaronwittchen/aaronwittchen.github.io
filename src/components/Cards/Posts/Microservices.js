import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../../../globals.css';

const Microservices = () => {
  const contentRef = useRef(null);

  const renderers = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const introduction = `
# What Are Microservices?

> **"Microservices are independently deployable services modeled around business domains."**

But what does that actually mean?

You're likely familiar with traditional architecture — for example, a [Spring Boot](https://spring.io/projects/spring-boot) application connected to a database, with a user interface interacting via a [REST API](https://restfulapi.net/). This is a classic **monolith** — a single application that we develop and deploy as one unit.  
Monoliths usually start off simple, but as they grow in complexity, they become harder to develop, deploy, and maintain. These growing pains are what led to architectural patterns like **microservices**.

Instead of one large application, you now have **several smaller, focused services**.

Consider microservices A, B, and C — each has its **own database** and a **well-defined API**. This API is the only way to interact with that service. There's no shared database or file system. Each service is a **black box** — we don't care what happens inside, only how it behaves through its public interface.
`;

  const businessDomainModeling = `
## Business Domain Modeling

Now let's explore the phrase **"modeled around business domains."**

In most organizations, teams are structured around **business capabilities** or domains, such as fulfillment, finance, and customer support. This aligns with [Domain-Driven Design (DDD)](https://martinfowler.com/bliki/DomainDrivenDesign.html) principles.

For example, an e-commerce business selling widgets might have:

- A **fulfillment domain** managing inventory and orders
- A **finance domain** processing payments and billing
- A **customer support domain** handling inquiries and issues
`;

  const monolithicVsMicroservices = `
### Monolithic vs Microservices Approach

**In a monolithic setup**, all these domains are handled by one application. This means every team's changes must be coordinated and ready before deployment. If one team isn't ready, no one can deploy — creating a deployment bottleneck.

**In a microservices setup**, each domain gets its own dedicated service:

- Order Management Service → Fulfillment Team
- Payment Processing Service → Finance Team
- Customer Service API → Support Team

Each team owns **everything** about their service: the data model, business logic, API design, and deployment pipeline. If one team wants to add a feature, they can **deploy independently** — as long as they maintain backward compatibility in their API contract.
`;

  const independentDeployability = `
## Independent Deployability

In a monolith, deployment means taking the entire latest version and putting it into production. As the codebase grows, deployments become increasingly risky and less frequent, often requiring lengthy testing cycles and coordination meetings.

With microservices, teams achieve true autonomy. They can deploy their services independently, enabling faster feature delivery and reducing the blast radius of potential issues.
`;

  const whyChooseMicroservices = `
## Why Choose Microservices?

**Why do businesses choose microservices?**

Businesses fundamentally want to deliver **value faster** — which usually translates to **increased revenue**. That value comes from either:

- Serving **more customers** (horizontal growth), or
- Serving **existing customers better** (feature enhancement)

Both scenarios require **scaling** — either your system's capacity or your development team's effectiveness.
`;

  const scalingTheSystem = `
### Scaling the System

Yes, you *can* scale a monolith — typically by spinning up multiple instances behind a [load balancer](https://www.nginx.com/resources/glossary/load-balancing/). However, complex monoliths make this challenging.

Different parts of your application may have varying resource needs — some components require high CPU for computation, others need substantial memory for caching. With a monolith, you're forced to provision for the highest common denominator across **one deployment unit**.

With microservices, you can **scale services independently** based on their specific needs. You can allocate CPU-optimized instances for compute-heavy services and memory-optimized instances for data-intensive ones. This granular scaling improves both performance and cost efficiency.
`;

  const scalingTheTeam = `
### Scaling the Team

Having many developers work on the same monolithic codebase often leads to:

- **Merge conflicts** and coordination overhead
- **Unclear ownership** of code sections
- **Deployment bottlenecks** requiring extensive coordination
- **Technical debt** accumulation from multiple teams making changes
- **Slower development velocity** as team size increases

Microservices help by giving each **small, cross-functional team complete ownership** over their service. They understand the codebase intimately, make architectural decisions quickly, and handle their own deployments. This autonomy allows **more developers** to work **effectively** across **smaller, well-scoped codebases** without stepping on each other.

This aligns with [Conway's Law](https://www.melconway.com/Home/Committees_Paper.html): "Organizations design systems that mirror their communication structures."
`;

  const majorChallenges = `
## Microservices: The Major Challenges

Let's address the **biggest challenges** with microservices. They're powerful — but they're **definitely not a silver bullet**.

Here are the three most significant concerns:
`;

  const distributedSystems = `
### 1. Distributed Systems Complexity

In a monolith, a method call happens within a single process with predictable latency and failure modes. In microservices, that call becomes a **network request** — which introduces:

- **Network latency and timeouts**
- **Partial failures** that are hard to reason about
- **Service discovery** complexity
- **Data consistency challenges** across service boundaries

You can no longer rely on simple [ACID transactions](https://en.wikipedia.org/wiki/ACID). Maintaining data consistency across services requires implementing patterns like [Saga](https://microservices.io/patterns/data/saga.html), [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html), or [CQRS](https://martinfowler.com/bliki/CQRS.html). These patterns solve real problems, but they add significant complexity.
`;

  const operationalOverhead = `
### 2. Operational Overhead

This is often called the **microservices tax** — the additional operational burden of managing multiple services.

Instead of monitoring one application, you now need to handle:

- **Multiple deployment pipelines** and release processes
- **Distributed logging and monitoring** across services
- **Service mesh** or API gateway configuration
- **Distributed tracing** to debug cross-service issues
- **Secret management** and security policies per service
- **Infrastructure as code** for each service's resources

Tools like [Kubernetes](https://kubernetes.io/), [Istio](https://istio.io/), [Jaeger](https://www.jaegertracing.io/), and [Prometheus](https://prometheus.io/) can help, but they require specialized knowledge and operational maturity.
`;

  const developmentComplexity = `
### 3. Development and Testing Complexity

**Testing becomes significantly more challenging.** You can't just spin up a single application and run comprehensive tests. You now need:

- **Contract testing** to ensure service compatibility
- **Integration test environments** with multiple running services
- **Service virtualization** or mocking for dependencies
- **End-to-end testing** across service boundaries

**Local development** also suffers — there's a practical limit to how many services you can run on your development machine. This often pushes development to cloud environments, which can slow down the feedback loop that makes developers productive.
`;

  const whenToChoose = `
## When Should You Choose Microservices?

Consider microservices when you have:

- **Multiple teams** (typically 3+ teams) working on the same domain
- **Clear business domain boundaries** that align with team structure
- **Mature DevOps practices** including CI/CD, monitoring, and infrastructure automation
- **Different scaling requirements** for different parts of your system
- **Organizational readiness** for increased operational complexity

**Start with a monolith** if you're:
- A small team (< 10 developers)
- Building an early-stage product
- Lacking operational maturity
- Uncertain about domain boundaries
`;

  const finalThoughts = `
## Final Thoughts

Microservices offer genuine benefits: **organizational scalability, technical flexibility, and deployment independence**. But they come with significant costs — **increased complexity, operational overhead, and coordination challenges**.

The decision should be driven by your organization's specific needs, team structure, and technical maturity. Many successful companies run on well-designed monoliths, and that's perfectly fine.

**Consider microservices when the organizational and technical benefits clearly outweigh the complexity costs — and ensure your team has the skills and tools to succeed before making the transition.**

> *Remember: Architecture is about trade-offs, not silver bullets. Choose the approach that best serves your business goals and team capabilities.*
`;

  const borderStyle = {
    border: '0',
    height: '1px',
    backgroundColor: '#2c2c2c',
    margin: '22px auto',
    transition: 'background-color 0.3s ease',
  };

  const Border = () => <div style={borderStyle} />;
  const handleJumpToTop = (e) => {
    e.preventDefault();
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className='card-content'
        style={{
          marginTop: '-30px',
          marginLeft: '-30px',
          marginRight: '-30px',
          marginBottom: '-10px',
          height: 'calc(100% - 40px)',
          overflowY: 'auto',
        }}
        ref={contentRef}
      >
        <ReactMarkdown components={renderers}>{introduction}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{businessDomainModeling}</ReactMarkdown>
        <ReactMarkdown components={renderers}>{monolithicVsMicroservices}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{independentDeployability}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{whyChooseMicroservices}</ReactMarkdown>
        <ReactMarkdown components={renderers}>{scalingTheSystem}</ReactMarkdown>
        <ReactMarkdown components={renderers}>{scalingTheTeam}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{majorChallenges}</ReactMarkdown>
        <ReactMarkdown components={renderers}>{distributedSystems}</ReactMarkdown>
        <ReactMarkdown components={renderers}>{operationalOverhead}</ReactMarkdown>
        <ReactMarkdown components={renderers}>{developmentComplexity}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{whenToChoose}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{finalThoughts}</ReactMarkdown>
        <Border />
        <div style={{ fontSize: '1.1em', color: '#eee' }}>
          Jump back to the top{' '}
          <a
            href="#top"
            onClick={handleJumpToTop}
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ↩
          </a>
        </div>
      </div>
    </div>
  );
};

export default Microservices;