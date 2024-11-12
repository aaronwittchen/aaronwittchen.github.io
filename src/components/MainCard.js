import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import AboutMe from './Cards/About/AboutMe';
import AboutThisWebsite from './Cards/About/AboutThisWebsite';
import Him from './Cards/About/Him';
import FirstPost from './Cards/Posts/FirstPost.js';
import Planet from './Cards/Art/Planet';
import MercuryCrystals from './Cards/Art/MercuryCrystals';
import Flow from './Cards/Art/Flow';
import Spring from './Cards/Art/Spring';
import Music from './Cards/Music/Music';
import Mountain from './Cards/Art/Mountain';
import '../index.css';
import { getResizeConfig } from './resizingConfig.ts';
import {
  AboutFolderIcon,
  RootFolderIcon,
  MusicFolderIcon,
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

  const [cards, setCards] = useState([
    {
      id: 1,
      x: window.innerWidth / 25,
      y: window.innerHeight / 10 - 70,
      type: 'main',
      isMinimized: false,
    },
    {
      id: 2,
      x: window.innerWidth / 3 - 100,
      y: window.innerHeight / 10 - 70,
      type: 'About Me',
      isMinimized: false,
    },
  ]);

  const [isRootOpen, setIsRootOpen] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(true);
  const [activeCardId, setActiveCardId] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);

  const handleCardClick = (id) => {
    setActiveCardId(id);
  };

  const handleDragStart = (id) => {
    setActiveCardId(id);
  };

  const toggleRootVisibility = () => {
    if (isRootOpen) {
      setIsRootOpen(false);
      setIsAboutVisible(false);
      setIsDetailsVisible(false);
      setIsAboutOpen(false);
      setIsArtOpen(false);
      setIsMusicOpen(false);
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

  const toggleMusicVisibility = () => {
    setIsMusicOpen(!isMusicOpen);
  };

  const togglePostsVisibility = () => {
    setIsPostsOpen(!isPostsOpen);
  };

  const createNewCard = (type) => {
    const isCardExisting = cards.some((card) => card.type === type);

    if (!isCardExisting) {
      const newId = cards.length + 1;
      const { x, y } = getRandomPosition();
      const newCard = { id: newId, x: x, y: y, type, isMinimized: false };
      setCards([...cards, newCard]);
    }
  };

  const handleCloseCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
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
      id="container"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {cards.map((card) => (
        <Rnd
          key={card.id}
          id="card"
          default={{
            x: card.x,
            y: card.y,
            width: 'auto',
            height: 'auto',
          }}
          style={{
            cursor: 'default',
            zIndex: activeCardId === card.id ? 15 : 1,
            position: 'absolute',
            border: '2px solid #eee',
            minWidth: '200px',
            maxWidth: '400px',
            padding: '0',
          }}
          bounds="#container"
          onClick={() => handleCardClick(card.id)}
          onDragStart={() => handleDragStart(card.id)}
          dragHandleClassName="card-navbar"
          enableResizing={getResizeConfig(card.type)}
        >
          <div className="card-inner">
            <div
              className="card-navbar"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <h2 className="h2">
                {card.type === 'main' ? 'files' : card.type}
              </h2>
              <button
                className="minimize-button"
                onClick={() => toggleMinimizeCard(card.id)}
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
                  className="close-button"
                  onClick={() => handleCloseCard(card.id)}
                >
                  x
                </button>
              )}
            </div>

            {!card.isMinimized && (
              <div className="card-content">
                {card.type === 'main' && (
                  <>
                    <div className="content-item">
                      <RootFolderIcon isRootOpen={isRootOpen} />
                      <button
                        className="folder-button"
                        onClick={toggleRootVisibility}
                      >
                        root
                      </button>
                    </div>

                    {isAboutVisible && (
                      <div className="content-item about-item">
                        <AboutFolderIcon isAboutOpen={isAboutOpen} />
                        <button
                          className="folder-button"
                          onClick={toggleAboutVisibility}
                        >
                          about
                        </button>
                      </div>
                    )}

                    {isAboutOpen && (
                      <>
                        <div className="content-item about-details">
                          <File />
                          <button
                            className="folder-button"
                            onClick={() => createNewCard('About Me')}
                          >
                            About Me
                          </button>
                        </div>
                        <div className="content-item about-details">
                          <File />
                          <button
                            className="folder-button"
                            onClick={() => createNewCard('About This Website')}
                          >
                            About This Website
                          </button>
                        </div>
                        <div className="content-item about-details">
                          <File />
                          <button
                            className="folder-button"
                            onClick={() => createNewCard('Him')}
                          >
                            Him
                          </button>
                        </div>
                      </>
                    )}

                    {isRootOpen && (
                      <>
                        <div className="content-item about-item">
                          <PostFolderIcon isPostsOpen={isPostsOpen} />
                          <button
                            className="folder-button"
                            onClick={togglePostsVisibility}
                          >
                            posts
                          </button>
                        </div>

                        {isPostsOpen && (
                          <div className="content-item about-details">
                            <File />
                            <button
                              className="folder-button"
                              onClick={() => createNewCard('First Post')}
                            >
                              First Post
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {isAboutVisible && (
                      <>
                        <div className="content-item about-item">
                          <MusicFolderIcon isMusicOpen={isMusicOpen} />
                          <button
                            className="folder-button"
                            onClick={toggleMusicVisibility}
                          >
                            music
                          </button>
                        </div>

                        {isMusicOpen && (
                          <div className="music-content">
                            <div className="content-item about-details">
                              <File />
                              <button
                                className="folder-button"
                                onClick={() => createNewCard('Music')}
                              >
                                Music File
                              </button>{' '}
                            </div>
                          </div>
                        )}

                        <div className="content-item about-item">
                          <ArtFolderIcon isArtOpen={isArtOpen} />
                          <button
                            className="folder-button"
                            onClick={toggleArtVisibility}
                          >
                            art
                          </button>
                        </div>

                        {isArtOpen && (
                          <>
                            <div className="content-item about-details">
                              <File />
                              <button
                                className="folder-button"
                                onClick={() => createNewCard('Planet')}
                              >
                                Planet
                              </button>
                            </div>
                            <div className="content-item about-details">
                              <File />
                              <button
                                className="folder-button"
                                onClick={() =>
                                  createNewCard('Mercury Crystals')
                                }
                              >
                                Mercury Crystals
                              </button>
                            </div>
                            <div className="content-item about-details">
                              <File />
                              <button
                                className="folder-button"
                                onClick={() => createNewCard('Flow')}
                              >
                                Flow
                              </button>
                            </div>
                            <div className="content-item about-details">
                              <File />
                              <button
                                className="folder-button"
                                onClick={() => createNewCard('Spring')}
                              >
                                Spring
                              </button>
                            </div>
                            <div className="content-item about-details">
                              <File />
                              <button
                                className="folder-button"
                                onClick={() => createNewCard('Mountain')}
                              >
                                Mountain
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
                {card.type === 'Him' && <Him />}
                {card.type === 'Planet' && <Planet />}
                {card.type === 'Mercury Crystals' && <MercuryCrystals />}
                {card.type === 'Flow' && <Flow />}
                {card.type === 'Mountain' && <Mountain />}
                {card.type === 'Spring' && <Spring />}
                {card.type === 'Music' && <Music />}
                {card.type === 'First Post' && <FirstPost />}
              </div>
            )}
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default MainCard;
