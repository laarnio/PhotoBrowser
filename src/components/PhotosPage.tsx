import React, { useEffect } from 'react';
import PhotoThumbnails from './PhotoThumbnails';
import { useStore, State } from '../store/PhotoBrowserStore';
import Pagination from './common/Pagination';
import PhotoBrowserSettingsComponent from './PhotoBrowserSettings';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';

export type PhotoInfo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  hers: number;
  thumbnailUrl: string;
};

const PhotoBrowserHeaderContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(12, fr);
`;

const PhotosPage = () => {
  const store = useStore((state: State) => state);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    store.getAllPhotos();
    handleQueryParams();
  }, []);

  const handleQueryParams = () => {
    const queryParams = new URLSearchParams(location.search);
    let param = queryParams.get('page');
    const page = param ? parseInt(param) : null;
    param = queryParams.get('limit');
    const limit = param ? parseInt(param) : null;
    const thumbnailSize = queryParams.get('thumbnailSize');
    const paginationNeighbours = queryParams.get('paginationNeighbours');

    if (page && store.pagination.currentPage != page) {
      store.pagination.setPage(page);
      queryParams.delete('page');
    }
    if (limit && store.pagination.limit != limit) {
      if (
        !store.thumbnails.thumbnailsPerPageOptions.find(
          (option) => option.value == limit
        )
      ) {
        store.thumbnails.addThumbnailPerPageOption({
          value: limit,
          label: limit.toString()
        });
      }
      store.pagination.setLimit(limit);
      queryParams.delete('limit');
    }
    if (
      thumbnailSize &&
      store.thumbnails.thumbnailSize != parseInt(thumbnailSize)
    ) {
      store.thumbnails.setThumbnailSize(parseInt(thumbnailSize));
      queryParams.delete('thumbnailSize');
    }
    if (
      paginationNeighbours &&
      store.pagination.paginationNeighbours != parseInt(paginationNeighbours)
    ) {
      store.pagination.setPaginationNeighbours(parseInt(paginationNeighbours));
      queryParams.delete('paginationNeighbours');
    }
    history.replace({
      search: queryParams.toString()
    });
  };

  const sliceStart =
    store.pagination.currentPage * store.pagination.limit -
    store.pagination.limit;
  const sliceEnd = sliceStart + store.pagination.limit;
  return (
    <>
      <PhotoBrowserHeaderContainer>
        <PhotoBrowserSettingsComponent />
        <p>Total photo count: {store.photos.length}</p>
      </PhotoBrowserHeaderContainer>

      <PhotoThumbnails
        height={store.thumbnails.thumbnailSize}
        width={store.thumbnails.thumbnailSize}
        photos={store.photos.slice(sliceStart, sliceStart + sliceEnd)}
      />

      <Pagination
        totalPages={Math.ceil(store.photos.length / store.pagination.limit)}
        currentPage={store.pagination.currentPage || 1}
        nextPage={store.pagination.setNextPage}
        previousPage={store.pagination.setPreviousPage}
        setPage={store.pagination.setPage}
        makeItSticky={store.pagination.isPaginationSticky}
        paginationNeighbours={store.pagination.paginationNeighbours}
      />
    </>
  );
};

export default PhotosPage;
