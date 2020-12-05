import React, { useState, useEffect } from 'react';
import PhotoThumbnails from './PhotoThumbnails';
import { useStore, State } from '../store/PhotoBrowserStore';
import Pagination from './common/Pagination';
import PhotoBrowserSettingsComponent from './PhotoBrowserSettingsComponent';
import styled from 'styled-components';
import { apiService } from '../api/api';

export type PhotoInfo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  hers: number;
  thumbnailUrl: string;
}

const PhotoBrowserHeaderContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(12, fr);
`;

const PhotosPage = () => {
  const photoBrowserSettings = useStore(
    (state: State) => state.photoBrowserSettings
  );
  const photoBrowserFunctions = useStore(
    (state: State) => state.photoBrowserFunctions
  );
  const photoBrowserData = useStore((state: State) => state.photoBrowserData);

  const [totalPhotoCount, setTotalPhotoCount] = useState(
    photoBrowserData.allPhotoInfos.length
  );

  useEffect(() => {
    apiService.getAllPhotos().then((photoInfos) => {
      photoBrowserFunctions.setAllPhotoInfos(photoInfos);
      setTotalPhotoCount(photoInfos.length);
    });
  }, []);

  useEffect(() => {
    apiService
      .getCurrentPagePhotoInfos(
        photoBrowserSettings.currentPage,
        photoBrowserSettings.limit
      )
      .then((currentPagePhotoInfos) => {
        photoBrowserFunctions.setCurrentPagePhotoInfos(currentPagePhotoInfos);
      });
  }, [photoBrowserSettings.currentPage, photoBrowserSettings.limit]);

  useEffect(() => {
    photoBrowserFunctions.setLastPage(
      Math.ceil(totalPhotoCount / photoBrowserSettings.limit)
    );
  }, [photoBrowserSettings.limit, totalPhotoCount]);

  return (
    <>
      <PhotoBrowserHeaderContainer>
        <PhotoBrowserSettingsComponent />
        <p>Total photo count: {totalPhotoCount}</p>
      </PhotoBrowserHeaderContainer>

      <PhotoThumbnails
        height={photoBrowserSettings.thumbnailSize}
        width={photoBrowserSettings.thumbnailSize}
        data={photoBrowserData.currentPagePhotoInfos}
      />
      
      <Pagination
        totalPages={photoBrowserSettings.lastPage}
        currentPage={photoBrowserSettings.currentPage}
        nextPage={photoBrowserFunctions.nextPage}
        previousPage={photoBrowserFunctions.previousPage}
        setPage={photoBrowserFunctions.setPage}
        makeItSticky={photoBrowserSettings.isPaginationSticky}
        paginationNeighbours={photoBrowserSettings.paginationNeighbours}
      />
    </>
  );
};

export default PhotosPage;
