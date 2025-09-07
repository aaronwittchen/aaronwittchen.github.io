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

const Project1 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.loop = true;
  }, []);

  const markdownContent1 = `
# Sorting Visualization Tool
  `;

  const markdownContent2 = `
**Interactive web app to visualize and understand sorting algorithms in real-time.**

**Available on [Github](https://github.com/aaronwittchen/sorting-visualization-tool)**  
**Live Page [here](https://sorting-visualization-tool.vercel.app/)**`;

  const markdownContent3 = `
An interactive web application that helps users learn and explore [sorting algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm) through real-time animated visualizations. Users can select from seven different algorithms—[Bubble Sort](https://en.wikipedia.org/wiki/Bubble_sort), [Selection Sort](https://en.wikipedia.org/wiki/Selection_sort), [Insertion Sort](https://en.wikipedia.org/wiki/Insertion_sort), [Merge Sort](https://en.wikipedia.org/wiki/Merge_sort), [Quick Sort](https://en.wikipedia.org/wiki/Quicksort), [Radix Sort](https://en.wikipedia.org/wiki/Radix_sort), and [Bucket Sort](https://en.wikipedia.org/wiki/Bucket_sort)—and watch them operate step by step. Interactive controls allow starting, pausing, resuming, resetting, and adjusting speed, while algorithm information modals provide insights into [time and space complexity](https://en.wikipedia.org/wiki/Time_complexity). State persistence ensures progress is maintained across sessions, and a responsive design makes the app accessible on all devices. The project is built with [React 18](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/), using the [Context API](https://react.dev/learn/passing-data-deeply-with-context) for state management, and it includes a comprehensive testing suite with unit, component, integration, and accessibility tests. This tool combines multiple features, such as animated visualizations, interactive controls, adjustable speed settings, educational content, algorithm performance insights, and a fully responsive interface, making it ideal for students, educators, and anyone curious about algorithm behavior.
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
            react, javascript, tailwindcss, web-app, algorithms, sorting-visualization
          </span>
        </div>
        <ReactMarkdown components={renderers}>{markdownContent2}</ReactMarkdown>
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          id='sortingVid'
          style={{
            width: '100%',
            height: 'auto',
            marginTop: '5px',
            marginBottom: '5px',
          }}
          loop
        >
          <source
            src='images/Sorting-Visualization-Showcase.mp4'
            type='video/mp4'
          />
        </video>
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

export default Project1;
