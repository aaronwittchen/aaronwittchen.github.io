import React from 'react';

export const RootFolderIcon = ({ isRootOpen }) => {
  return (
    <img
      src={isRootOpen ? './images/openFolder.png' : './images/closedFolder.png'}
      alt="Folder Icon"
      className="folder-icon"
    />
  );
};

export const AboutFolderIcon = ({ isAboutOpen }) => {
  return (
    <img
      src={
        isAboutOpen ? './images/openFolder.png' : './images/closedFolder.png'
      }
      alt="Folder Icon"
      className="folder-icon"
    />
  );
};

export const PostFolderIcon = ({ isPostsOpen }) => {
  return (
    <img
      src={
        isPostsOpen ? './images/openFolder.png' : './images/closedFolder.png'
      }
      alt="Folder Icon"
      className="folder-icon"
    />
  );
};

export const MusicFolderIcon = ({ isMusicOpen }) => {
  return (
    <img
      src={
        isMusicOpen ? './images/openFolder.png' : './images/closedFolder.png'
      }
      alt="Folder Icon"
      className="folder-icon"
    />
  );
};

export const ArtFolderIcon = ({ isArtOpen }) => {
  return (
    <img
      src={isArtOpen ? './images/openFolder.png' : './images/closedFolder.png'}
      alt="Folder Icon"
      className="folder-icon"
    />
  );
};

export const File = () => {
  return (
    <img src="./images/file.png" alt="File Icon" className="folder-icon" />
  );
};
