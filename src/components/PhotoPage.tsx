import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore, State } from '../store/PhotoBrowserStore';
import { apiService } from '../api/api';
import type { PhotoInfo } from '../components/PhotosPage';
import styled from 'styled-components';

interface ParamTypes {
  id: string;
}

const Photo = styled.img`
  width: 600px;
  height: 600px;
`;

interface ImageContainerProps {
  visible?: boolean;
}

const PhotoPage = () => {
  let { id } = useParams<ParamTypes>();
  const photoInfoFromStore = useStore((state: State) =>
    state.allPhotoInfos.find((photoInfo) => photoInfo.id === parseInt(id))
  );
  const [photoInfo, setPhotoInfo] = useState<PhotoInfo | null | undefined>(
    photoInfoFromStore
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!photoInfo) {
      apiService.getPhotoInfoById(parseInt(id)).then((res) => {
        setPhotoInfo(res);
      });
    }
  }, []);

  const img = new Image();
  if (photoInfo != null) {
    img.src = photoInfo.url;
    img.onload = () => {
      setIsReady(true);
    };
  }

  return (
    <div>
      <h1>Photo id: {id}</h1>
      <Photo src={isReady ? photoInfo?.url : photoInfo?.thumbnailUrl} />
      {photoInfo?.title}
    </div>
  );
};
export default PhotoPage;
