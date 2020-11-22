import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoThumbnail from './PhotoThumbnail';
import { useStore, State } from '../store/PhotoBrowserStore';
import PaginationComponent from './common/PaginationComponent';
import PhotoBrowserSettingsComponent from './PhotoBrowserSettingsComponent';
import styled from 'styled-components';

export interface PhotoInfo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  hers: number;
  thumbnailUrl: string;
}
interface Response {
  data: PhotoInfo[];
}

const PhotoBrowserHeaderContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 100px;
`;

const PhotosPage = () => {
  const photoBrowserSettings = useStore(
    (state: State) => state.photoBrowserSettings
  );
  const photoBrowserFunctions = useStore(
    (state: State) => state.photoBrowserFunctions
  );

  const [totalPhotoCount, setTotalPhotoCount] = useState(1);
  const [data, setData] = useState<PhotoInfo[]>([]);

  useEffect(() => {
    const allPhotosURI = `http://jsonplaceholder.typicode.com/photos`;
    axios.get(allPhotosURI).then((res: Response) => {
      setTotalPhotoCount(res.data.length);
    });
  }, []);

  useEffect(() => {
    const photosURI = `http://jsonplaceholder.typicode.com/photos?_page=${photoBrowserSettings.currentPage}&_limit=${photoBrowserSettings.limit}}`;
    axios.get(photosURI).then((res: Response) => {
      setData(res.data);
    });
  }, [photoBrowserSettings.currentPage, photoBrowserSettings.limit]);

  useEffect(() => {
    photoBrowserFunctions.setLastPage(
      Math.ceil(totalPhotoCount / photoBrowserSettings.limit)
    );
  }, [photoBrowserSettings.limit, totalPhotoCount]);

  return (
    <div>
      <PhotoBrowserHeaderContainer>
          <h3>Photos</h3>
          Total photo count: {totalPhotoCount}
          <PhotoBrowserSettingsComponent />
      </PhotoBrowserHeaderContainer>

      <PhotoThumbnails
        height={photoBrowserSettings.thumbnailSize}
        width={photoBrowserSettings.thumbnailSize}
        data={data}
      />

      <PaginationComponent
        totalPages={photoBrowserSettings.lastPage}
        currentPage={photoBrowserSettings.currentPage}
        nextPage={photoBrowserFunctions.nextPage}
        previousPage={photoBrowserFunctions.previousPage}
      />
    </div>
  );
};
export default PhotosPage;

const PhotoThumbnails: React.FC<{
  data: PhotoInfo[];
  height: number;
  width: number;
}> = ({ data, height, width }) => {
  if (!data) return <p> Loading </p>;

  return (
    <div>
      {data.map((photoInfo: PhotoInfo) => (
        <PhotoThumbnail
          width={width}
          height={height}
          key={photoInfo.id}
          photoInfo={photoInfo}
        />
      ))}
    </div>
  );
};
