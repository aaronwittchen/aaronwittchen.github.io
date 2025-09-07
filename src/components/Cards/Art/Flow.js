import React, { useRef, useEffect } from 'react';
import '../../../globals.css';

const Flow = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    video.loop = true;
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className="card-content"
        style={{
          marginTop: '-30px',
          marginLeft: '-50px',
          marginRight: '-50px',
          marginBottom: '-39px',
        }}
      >
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          id="robotVid"
          style={{ width: '100%', height: 'auto' }}
          loop
        >
          <source src="images/Flow.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Flow;
