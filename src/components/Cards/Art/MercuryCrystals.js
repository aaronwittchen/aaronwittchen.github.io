import React, { useRef, useEffect } from 'react';
import '../../../globals.css';

const MercuryCrystals = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnd = () => {
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 2500);
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
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
        >
          <source src="images/MercuryCrystals.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default MercuryCrystals;
