import React, { useEffect } from 'react';
import PhotoThumbnails from './PhotoThumbnails';
import { useStore, State } from '../store/PhotoBrowserStore';
import Pagination from './common/Pagination';
import PhotoBrowserSettings from './PhotoBrowserSettings';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import Select, { SelectOption } from './common/Select';

export type PhotoInfo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const PhotoThumbnailContainer = styled.div`
  flex: 1 1 auto;
  margin-top: 1em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const SelectContainer = styled.div`
  grid-column: 1/4;
`;

const InfoContainer = styled.div`
  grid-column: 10/14;
  position: relative;
`;
const PhotoCount = styled.p`
  font-size: small;
  margin: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  color: ${(props) => props.theme.teal.six};
`;
const SettingsContainer = styled.div`
  grid-column: 13/13;
  position: relative;
`;

const PhotosPage = () => {
  const store = useStore((state: State) => state);
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    store.getAllPhotos();
    store.getAllAlbums();
    handleQueryParams();
  }, []);
  useEffect(() => {

    let param = queryParams.get('page');
    const page = param ? parseInt(param, 10) : null;
    if (page && store.pagination.currentPage !== page) {
      store.pagination.setPage(page);
    }
  }, [queryParams.get('page')]);


  const handleQueryParams = () => {
    let param = queryParams.get('limit');
    const limit = param ? parseInt(param, 10) : null;
    const thumbnailSize = queryParams.get('thumbnailSize');
    const paginationNeighbours = queryParams.get('paginationNeighbours');

    if (limit && store.pagination.limit !== limit) {
      store.pagination.setLimit(limit);
    }
    if (
      thumbnailSize &&
      store.thumbnails.thumbnailSize !== parseInt(thumbnailSize, 10)
    ) {
      store.thumbnails.setThumbnailSize(parseInt(thumbnailSize, 10));
      queryParams.delete('thumbnailSize');
    }
    if (
      paginationNeighbours &&
      store.pagination.paginationNeighbours !==
        parseInt(paginationNeighbours, 10)
    ) {
      store.pagination.setPaginationNeighbours(
        parseInt(paginationNeighbours, 10)
      );
      queryParams.delete('paginationNeighbours');
    }
  };

  const allOption: SelectOption = {
    label: 'All',
    value: null
  };

  let albumOptions = store.albums
    .map((album) => ({
      label: album.title.toString(),
      value: album.id
    }))
    .concat(allOption);

  const filterPhotos = () => {
    let filteredPhotos = store.photos;
    if (store.filters.albumId) {
      filteredPhotos = filteredPhotos.filter(
        (photo) => photo.albumId === store.filters.albumId
      );
    }
    return filteredPhotos;
  };

  const handleNextPage = () => {
    history.push('/photos?page=' + (store.pagination.currentPage + 1));
    store.pagination.setNextPage();
  };

  const handlePrevPage = () => {
    history.push('/photos?page=' + (store.pagination.currentPage - 1));
    store.pagination.setPreviousPage();
  };

  const handleSetPage = (page: number) => {
    history.push('/photos?page=' + page);
    store.pagination.setPage(page);
  };
  let defaultOption = allOption;
  if (store.filters.albumId) {
    let selectedAlbum = store.albums.find(
      (album) => album.id === store.filters.albumId
    );
    defaultOption = {
      value: selectedAlbum?.id,
      label: selectedAlbum ? selectedAlbum.title : 'Error'
    };
  }
  return (
    <>
      <Grid>
        <SettingsContainer>
          <PhotoBrowserSettings />
        </SettingsContainer>
        {!store.isLoadingAlbums && (
          <SelectContainer>
            <Select
              options={albumOptions}
              defaultOption={defaultOption}
              label={'Filter by album:'}
              onChange={(albumId: string) =>
                store.filters.setAlbumFilter(parseInt(albumId))
              }
            />
          </SelectContainer>
        )}
        <InfoContainer>
          <PhotoCount>Total photo count: {store.photos.length}</PhotoCount>
        </InfoContainer>
      </Grid>

      <PhotoThumbnailContainer>
        <PhotoThumbnails
          height={store.thumbnails.thumbnailSize}
          width={store.thumbnails.thumbnailSize}
        />
      </PhotoThumbnailContainer>

      <Pagination
        totalPages={Math.ceil(filterPhotos().length / store.pagination.limit)}
        currentPage={store.pagination.currentPage || 1}
        nextPage={handleNextPage}
        previousPage={handlePrevPage}
        setPage={(page: number) => handleSetPage(page)}
        makeItSticky={store.pagination.isPaginationSticky}
        paginationNeighbours={store.pagination.paginationNeighbours}
      />
    </>
  );
};

export default PhotosPage;
