import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import AboutMe from './Cards/About/AboutMe';
import AboutThisWebsite from './Cards/About/AboutThisWebsite';
import ProgressReports from './Cards/Posts/ProgressReports.js';
import Microservices from './Cards/Posts/Microservices.js';
import BuildingMicrograd from './Cards/Posts/BuildingMicrograd.js';
import ApacheKafkaGlobalOverview from './Cards/Posts/ApacheKafkaGlobalOverview.js';
import Planet from './Cards/Art/Planet';
import MercuryCrystals from './Cards/Art/MercuryCrystals';
import Flow from './Cards/Art/Flow';
import Spring from './Cards/Art/Spring';
import SortingVisualizationTool from './Cards/Projects/SortingVisualizationTool';
import Mountain from './Cards/Art/Mountain';
import Tree from './Cards/Art/Tree';
import Invoicipedia from './Cards/Projects/Invoicipedia';
import NeoWsTrackingApplication from './Cards/Projects/NeoWs-Tracking-Application';
import MERNJWTAuth from './Cards/Projects/MERN-JWT-Auth';
import TicketBookingSystem from './Cards/Projects/Ticket-Booking-System';
import '../globals.css';
import { getResizeConfig } from './resizingConfig.ts';
import { getCardDimensions } from './cardDimensions.ts';
import {
  AboutFolderIcon,
  RootFolderIcon,
  ProjectsFolderIcon,
  ArtFolderIcon,
  PostFolderIcon,
  File,
} from './Icons.js';

const MainCard = () => {
  const getRandomPosition = () => {
    const randomX =
      Math.random() * (window.innerWidth / 4 - window.innerWidth / 3) +
      window.innerWidth / 3 -
      100;
    const randomY =
      Math.random() * (window.innerHeight / 13 - window.innerHeight / 14 - 50) +
      window.innerHeight / 10 -
      50;
    return { x: randomX, y: randomY };
  };

  const [cards, setCards] = useState(() => {
    const aboutMeDimensions = getCardDimensions('About Me');
    return [
      {
        id: 1,
        x: window.innerWidth / 25,
        y: window.innerHeight / 10 - 70,
        width: 'auto',
        height: 'auto',
        type: 'main',
        isMinimized: false,
      },
      {
        id: 2,
        x: window.innerWidth / 3 - 100,
        y: window.innerHeight / 10 - 70,
        width: aboutMeDimensions.width,
        height: aboutMeDimensions.height,
        type: 'About Me',
        isMinimized: false,
      },
    ];
  });

  const [isRootOpen, setIsRootOpen] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(true);
  const [activeCardId, setActiveCardId] = useState(2);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);

  const handleCardClick = (id) => {
    setActiveCardId(id);
  };

  const handleDragStart = (id) => {
    // Allow dragging and bring the "files" card forward temporarily if dragged
    if (id === 1) {
      setActiveCardId(1);
    } else {
      setActiveCardId(id);
    }
  };

  const handleDragStop = (id, d) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, x: d.x, y: d.y } : card))
    );
  };

  const handleResizeStop = (id, direction, ref, delta, position) => {
    setCards(
      cards.map((card) =>
        card.id === id
          ? {
              ...card,
              width: ref.style.width,
              height: ref.style.height,
              x: position.x,
              y: position.y,
            }
          : card
      )
    );
  };

  const toggleRootVisibility = () => {
    if (isRootOpen) {
      setIsRootOpen(false);
      setIsAboutVisible(false);
      setIsDetailsVisible(false);
      setIsAboutOpen(false);
      setIsArtOpen(false);
      setIsProjectsOpen(false);
      setIsPostsOpen(false); // Close posts when root is closed
    } else {
      setIsRootOpen(true);
      setIsAboutVisible(true);
    }
  };

  const toggleAboutVisibility = () => {
    setIsAboutOpen(!isAboutOpen);
    setIsDetailsVisible(!isDetailsVisible);
  };

  const toggleArtVisibility = () => {
    setIsArtOpen(!isArtOpen);
  };

  const toggleProjectsVisibility = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const togglePostsVisibility = () => {
    setIsPostsOpen(!isPostsOpen);
  };

  const createNewCard = (type) => {
    const isCardExisting = cards.some((card) => card.type === type);

    if (!isCardExisting) {
      const newId = cards.length + 1;
      const { x, y } = getRandomPosition();
      const defaultDimensions = getCardDimensions(type);
      const newCard = {
        id: newId,
        x: x,
        y: y,
        width: defaultDimensions.width,
        height: defaultDimensions.height,
        type,
        isMinimized: false,
      };
      setCards([...cards, newCard]);
      setActiveCardId(newId);
    }
  };

  const handleCloseCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
    if (id === activeCardId) {
      setActiveCardId(1); // Focus returns to 'files' card
    }
  };

  const toggleMinimizeCard = (id) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isMinimized: !card.isMinimized } : card
      )
    );
  };

  return (
    <div
      id='container'
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {cards.map((card) => (
        <Rnd
          key={`${card.id}-${card.isMinimized}`}
          id='card'
          position={{
            x: card.x,
            y: card.isMinimized ? card.y : card.y,
          }}
          size={{
            width: card.width,
            height: card.isMinimized ? 30 : card.height,
          }}
          minWidth={200}
          minHeight={card.isMinimized ? 30 : 150}
          style={{
            cursor: 'default',
            zIndex: activeCardId === card.id ? 15 : card.id,
            position: 'absolute',
            border: '2px solid #eee',
            padding: '0',
          }}
          bounds='window'
          onClick={() => handleCardClick(card.id)}
          onDragStart={() => handleDragStart(card.id)}
          onDragStop={(e, d) => handleDragStop(card.id, d)}
          onResizeStop={(e, direction, ref, delta, position) =>
            handleResizeStop(card.id, direction, ref, delta, position)
          }
          dragHandleClassName='card-navbar'
          enableResizing={getResizeConfig(card.type)}
          resizeHandleStyles={{
            top: { cursor: 'n-resize' },
            left: { cursor: 'w-resize' },
            right: { cursor: 'e-resize' },
          }}
        >
          <div className={`card-inner ${card.isMinimized ? 'minimized' : ''}`}>
            <div
              className='card-navbar'
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <h2 className='h2'>
                {card.type === 'main' ? 'files' : card.type}
              </h2>
              <button
                className='minimize-button'
                onClick={() => toggleMinimizeCard(card.id)}
                onTouchStart={() => toggleMinimizeCard(card.id)}
                style={
                  card.type !== 'main'
                    ? {
                        marginLeft: 'auto',
                        position: 'absolute',
                        right: '20px',
                      }
                    : { right: '0px' }
                }
              >
                {card.isMinimized ? '+' : '-'}
              </button>
              {card.type !== 'main' && (
                <button
                  className='close-button'
                  onClick={() => handleCloseCard(card.id)}
                  onTouchStart={() => handleCloseCard(card.id)}
                >
                  x
                </button>
              )}
            </div>

            {!card.isMinimized && (
              <div
                className={`card-content ${
                  [
                    'Planet',
                    'Mercury Crystals',
                    'Flow',
                    'Spring',
                    'Mountain',
                    'Tree',
                  ].includes(card.type)
                    ? 'art-content'
                    : ''
                }`}
              >
                {card.type === 'main' && (
                  <>
                    <div className='content-item'>
                      <RootFolderIcon isRootOpen={isRootOpen} />
                      <button
                        className='folder-button'
                        onClick={toggleRootVisibility}
                      >
                        root
                      </button>
                    </div>

                    {isAboutVisible && (
                      <div className='content-item about-item'>
                        <AboutFolderIcon isAboutOpen={isAboutOpen} />
                        <button
                          className='folder-button'
                          onClick={toggleAboutVisibility}
                        >
                          about
                        </button>
                      </div>
                    )}

                    {isAboutOpen && (
                      <>
                        <div className='content-item about-details'>
                          <File />
                          <button
                            className='folder-button'
                            onClick={() => createNewCard('About Me')}
                          >
                            About Me
                          </button>
                        </div>
                        <div className='content-item about-details'>
                          <File />
                          <button
                            className='folder-button'
                            onClick={() => createNewCard('About This Website')}
                          >
                            About This Website
                          </button>
                        </div>
                      </>
                    )}

                    {isRootOpen && (
                      <>
                        <div className='content-item about-item'>
                          <PostFolderIcon isPostsOpen={isPostsOpen} />
                          <button
                            className='folder-button'
                            onClick={togglePostsVisibility}
                          >
                            posts
                          </button>
                        </div>

                        {isPostsOpen && (
                          <>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() =>
                                  createNewCard(
                                    'Understanding Microservices: Benefits, Use Cases, and Common Pitfalls'
                                  )
                                }
                              >
                                Understanding Microservices
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() =>
                                  createNewCard(
                                    'Building Micrograd: A Minimal Autograd Engine'
                                  )
                                }
                              >
                                Building Micrograd
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() =>
                                  createNewCard('Apache Kafka Global Overview')
                                }
                              >
                                Apache Kafka Global Overview
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {isAboutVisible && (
                      <>
                        <div className='content-item about-item'>
                          <ProjectsFolderIcon isProjectsOpen={isProjectsOpen} />
                          <button
                            className='folder-button'
                            onClick={toggleProjectsVisibility}
                          >
                            projects
                          </button>
                        </div>

                        {isProjectsOpen && (
                          <div className='Projects-content'>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() =>
                                  createNewCard('Sorting Visualization Tool')
                                }
                              >
                                Sorting Visualization Tool
                              </button>{' '}
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() => createNewCard('Invoicipedia')}
                              >
                                Invoicipedia
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() =>
                                  createNewCard('NeoWsTrackingApplication')
                                }
                              >
                                NeoWs Tracking Application
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() => createNewCard('MERNJWTAuth')}
                              >
                                MERN JWT Auth
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() =>
                                  createNewCard('TicketBookingSystem')
                                }
                              >
                                Ticket Booking System
                              </button>
                            </div>
                          </div>
                        )}

                        <div className='content-item about-item'>
                          <ArtFolderIcon isArtOpen={isArtOpen} />
                          <button
                            className='folder-button'
                            onClick={toggleArtVisibility}
                          >
                            art
                          </button>
                        </div>

                        {isArtOpen && (
                          <>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() => createNewCard('Mountain')}
                              >
                                Mountain
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() =>
                                  createNewCard('Mercury Crystals')
                                }
                              >
                                Mercury Crystals
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() => createNewCard('Flow')}
                              >
                                Flow
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() => createNewCard('Spring')}
                              >
                                Spring
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() => createNewCard('Planet')}
                              >
                                Planet
                              </button>
                            </div>
                            <div className='content-item about-details'>
                              <File />
                              <button
                                className='folder-button'
                                onClick={() => createNewCard('Tree')}
                              >
                                Tree
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {card.type === 'About Me' && <AboutMe />}
                {card.type === 'About This Website' && <AboutThisWebsite />}
                {card.type === 'Planet' && <Planet />}
                {card.type === 'Mercury Crystals' && <MercuryCrystals />}
                {card.type === 'Flow' && <Flow />}
                {card.type === 'Mountain' && <Mountain />}
                {card.type === 'Spring' && <Spring />}
                {card.type === 'Sorting Visualization Tool' && (
                  <SortingVisualizationTool />
                )}
                {card.type === 'Invoicipedia' && <Invoicipedia />}
                {card.type === 'NeoWsTrackingApplication' && (
                  <NeoWsTrackingApplication />
                )}
                {card.type === 'MERNJWTAuth' && <MERNJWTAuth />}
                {card.type === 'TicketBookingSystem' && <TicketBookingSystem />}
                {card.type === 'Progress-Reports' && <ProgressReports />}
                {card.type ===
                  'Understanding Microservices: Benefits, Use Cases, and Common Pitfalls' && (
                  <Microservices />
                )}
                {card.type ===
                  'Building Micrograd: A Minimal Autograd Engine' && (
                  <BuildingMicrograd />
                )}
                {card.type === 'Apache Kafka Global Overview' && (
                  <ApacheKafkaGlobalOverview />
                )}
                {card.type === 'Tree' && <Tree />}
              </div>
            )}
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default MainCard;
