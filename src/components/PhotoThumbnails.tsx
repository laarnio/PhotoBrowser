import React from 'react';
import type { PhotoInfo } from './PhotosPage';
import PhotoThumbnail from './PhotoThumbnail';
import styled from 'styled-components';

const PhotoThumbnailsContainer = styled.div`
  min-height: 200px;
`;

const PhotoThumbnails: React.FC<{
  data: PhotoInfo[];
  height: number;
  width: number;
}> = ({ data, height, width }) => {
  if (!data) return <p> Loading </p>;

  return (
    <PhotoThumbnailsContainer>
      {data.map((photoInfo: PhotoInfo) => (
        <PhotoThumbnail
          width={width}
          height={height}
          key={photoInfo.id}
          photoInfo={photoInfo}
        />
      ))}
    </PhotoThumbnailsContainer>
  );
};

export default PhotoThumbnails;
