import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../../globals.css';

const ApacheKafkaGlobalOverview = () => {
  const content = `
# Apache Kafka Global Overview

to be added
`;

  return (
    <div className="prose max-w-none p-4 overflow-auto h-full">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default ApacheKafkaGlobalOverview;
