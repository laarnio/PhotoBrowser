import React, { useState } from 'react';
import styled from 'styled-components';
import type { PhotoInfo } from './PhotosPage';
import { Link } from 'react-router-dom';

const ThumbNailContainer = styled.div`
  display: inline-block;
  img {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: ${(props: ThumbNailContainerProps) => props.width}px;
    height: ${(props: ThumbNailContainerProps) => props.height}px;
  }

  img:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

interface ThumbNailContainerProps {
  width: number;
  height: number;
}

const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({
  photoInfo,
  height = 150,
  width = 150
}) => {
  const PHOTO_URL = `/photos/${photoInfo.id}`;
  return (
    <ThumbNailContainer height={height} width={width}>
      <Link to={PHOTO_URL}>
        <img src={photoInfo.thumbnailUrl} alt={photoInfo.title}></img>
      </Link>
    </ThumbNailContainer>
  );
};

interface PhotoThumbnailProps {
  photoInfo: PhotoInfo;
  height?: number;
  width?: number;
}

export default PhotoThumbnail;
