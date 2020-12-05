import React from 'react';
import type { PhotoInfo } from './PhotosPage';
import PhotoThumbnail from './PhotoThumbnail';
import styled from 'styled-components';

const PhotoThumbnailsContainer = styled.div`
  min-height: 200px;
`;

const PhotoThumbnails: React.FC<{
  photos: PhotoInfo[];
  height: number;
  width: number;
}> = ({ photos, height, width }) => {
  if (!photos) return <p> Loading </p>;

  return (
    <PhotoThumbnailsContainer>
      {photos.map((photo: PhotoInfo) => (
        <PhotoThumbnail
          width={width}
          height={height}
          key={photo.id}
          photoInfo={photo}
        />
      ))}
    </PhotoThumbnailsContainer>
  );
};

export default PhotoThumbnails;
