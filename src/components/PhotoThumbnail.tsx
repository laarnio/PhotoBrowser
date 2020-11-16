import React from 'react';
import styled from 'styled-components';
import type { PhotoInfo } from './PhotosPage';

const ThumbNailContainer = styled.div`
  display: inline-block;
  img {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: ${(props: ThumbNailContainerProps) => props.width}px;
  }

  img:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

interface ThumbNailContainerProps {
  width: number;
  height: number;
}

const PhotoThumbnail = (props: { photoInfo: PhotoInfo }) => {
  return (
    <ThumbNailContainer height={150} width={150}>
      <img src={props.photoInfo.thumbnailUrl} alt={props.photoInfo.title}></img>
    </ThumbNailContainer>
  );
};

export default PhotoThumbnail;
