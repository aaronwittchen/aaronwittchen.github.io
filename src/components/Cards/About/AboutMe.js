import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import '../../../globals.css';

const components = {
  img: ({ src, alt, ...props }) => {
    // Make the thumbnail image a specific size
    if (
      src === './images/thumbnail-gray.png' ||
      src === '/images/thumbnail-gray.png' ||
      alt === 'Thumbnail Image'
    ) {
      return (
        <img
          src={src}
          alt={alt}
          style={{
            width: '250px',
            height: '250px',
            objectFit: 'contain',
            marginTop: '8px',
            marginBottom: '8px',
          }}
          {...props}
        />
      );
    }
    // Default: let other images use their own sizes, but reduce top/bottom margin
    return (
      <img
        src={src}
        alt={alt}
        style={{ marginTop: '-10px', marginBottom: '-10px' }}
        {...props}
      />
    );
  },
};

const AboutMe = () => {
  const markdownContent = `
# Hello 

I&#39;m Aaron, and this is my website. I studied computer science in Friedrich-Schiller-Universität Jena, Germany.

I&#39;m always exploring the intersection of technology and creativity—whether that&#39;s [coding projects](https://github.com/aaronwittchen), experimenting with AI, or visualizing patterns through art.

Fluent in german, english and russian; I&#39;m currently learning italian.

This site is a little corner of the internet where I collect things I&#39;ve made and things I&#39;m learning. It&#39;s a work-in-progress, so expect it to change and grow over time.

![Thumbnail Image](./images/thumbnail-gray.png)    
(blender art i made, i&#39;m not comfortable putting my face on the internet)

If you want to connect, collaborate, or just say hi, feel free to reach out through [github](https://github.com/aaronwittchen), [linkedin](https://www.linkedin.com/in/aaron-wittchen/) or send me an [email](mailto:aaronwittchen@gmail.com).   
My Matrix:   
My Mastodon:

My CV is here.

## Languages & Technologies

### Programming Languages
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" title="C" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" title="C++" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" title="Java" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" title="Python" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" title="JavaScript" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" title="TypeScript" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="SQL" title="SQL" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" title="HTML5" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" title="CSS3" style="vertical-align: middle; display: inline-block;"/>
<img width="40" img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wasm/wasm-original.svg" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash" title="Bash" style="vertical-align: middle; display: inline-block;"/>

### Libraries
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue.js" title="Vue.js" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" title="Tailwind CSS" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" alt="Material-UI" title="Material-UI" style="vertical-align: middle; display: inline-block;"/>
<img width="40" img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" title="Express.js" style="filter: invert(100%); vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" title="Node.js" style="vertical-align: middle; display: inline-block;"/>
<img width="40" img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" title="Flask" style="filter: invert(100%); vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" title="Django" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" alt="FastAPI" title="FastAPI" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring" title="Spring" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg" alt="Hibernate" title="Hibernate" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/junit.png" alt="JUnit" title="JUnit" style="vertical-align: middle; display: inline-block;"/>

### Frameworks
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" title="Next.js" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" alt="Nuxt.js" title="Nuxt.js" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" title="Spring Boot" style="vertical-align: middle; display: inline-block;"/>

### Software/Tools
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman" title="Postman" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" alt="Jira" title="Jira" style="vertical-align: middle; display: inline-block;"/>

### Platforms
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" alt="Windows" title="Windows" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="macOS" title="macOS" style="filter: invert(100%); vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" title="Vercel" style="filter: invert(100%); vertical-align: middle; display: inline-block;"/>

### Version Control Systems
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" title="Git" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" title="GitHub" style="filter: invert(100%); vertical-align: middle; display: inline-block;"/>

### IDEs and Editors
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" title="Visual Studio Code" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" alt="IntelliJ IDEA" title="IntelliJ IDEA" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg" alt="Eclipse" title="Eclipse" style="vertical-align: middle; display: inline-block;"/>

### Tools
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" title="Docker" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes" title="Kubernetes" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins" title="Jenkins" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" alt="GitHub Actions" title="GitHub Actions" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg" alt="Maven" title="Maven" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/vite.png" alt="Vite" title="Vite" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" alt="ESLint" title="ESLint" style="vertical-align: middle; display: inline-block;"/>

### Currently Exploring and Learning
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" alt="Go" title="Go" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" alt="Kotlin" title="Kotlin" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" alt="jQuery" title="jQuery" style="vertical-align: middle; display: inline-block;"/>
<img width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" style="vertical-align: middle; display: inline-block;"/>

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
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AboutMe;
