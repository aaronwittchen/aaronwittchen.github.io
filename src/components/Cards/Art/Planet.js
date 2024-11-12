import React from 'react';
import '../../../index.css';

const Planet = () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="card-content" style={{ marginTop: '-30px', marginLeft: '-50px', marginRight: '-50px', marginBottom: '-39px' }}>
          {/* <iframe src="https://drive.google.com/file/d/1glCVdeRGSpoiBIv_HEGPVLH1IWj01xFI/preview" width="640" height="480" allow="autoplay"></iframe> */}
          <video playsInline autoPlay loop muted id="robotVid" style={{ width: '100%', height: 'auto' }}>
            <source src="images/Planet.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  };
  
export default Planet;
