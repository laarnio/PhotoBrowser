import React, { useEffect } from 'react';
import type { PhotoInfo } from './PhotosPage';
import PhotoThumbnail from './PhotoThumbnail';
import styled from 'styled-components';
import { useStore, State } from '../store/PhotoBrowserStore';

const PhotoThumbnailsContainer = styled.div`
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PhotoThumbnails: React.FC<{
  height: number;
  width: number;
}> = ({ height, width }) => {
  const store = useStore((state: State) => state);

  const filterPhotos = () => {
    let filteredPhotos = store.photos;
    if (store.filters.albumId) {
      filteredPhotos = filteredPhotos.filter(
        (photo) => photo.albumId === store.filters.albumId
      );
    }
    const sliceStart =
      store.pagination.currentPage * store.pagination.limit -
      store.pagination.limit;
    const sliceEnd = sliceStart + store.pagination.limit;

    return (filteredPhotos = filteredPhotos.slice(sliceStart, sliceEnd));
  };

  return (
    <PhotoThumbnailsContainer>
      {filterPhotos().map((photo: PhotoInfo) => (
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
