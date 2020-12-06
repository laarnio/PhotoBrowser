import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore, State } from '../store/PhotoBrowserStore';
import styled from 'styled-components';

interface ParamTypes {
  id: string;
}

const Photo = styled.img`
  display: ${(props: { hidden: boolean }) => (props.hidden ? 'none' : 'block')}
  width: 600px;
  height: 600px;
  grid-column: 2 / 4;

  @media screen and (max-width: 664px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 400px) {
    width: 200px;
    height: 200px;
  }
`;

const PhotoPageContainer = styled.div``;

const PhotoPage = () => {
  let { id } = useParams<ParamTypes>();
  const store = useStore((state: State) => state);
  const [isReady, setIsReady] = useState(false);
  //const [photo, setPhoto] = useState<PhotoInfo | null>(null);

  useEffect(() => {
    if (store.photos.length === 0) {
      store.getAllPhotos();
    }
  }, []);

  let photo = store.photos.find((photo) => photo.id === parseInt(id));
  return (
    <PhotoPageContainer>
      <Photo src={photo?.thumbnailUrl} hidden={isReady} />
      <Photo
        src={photo?.url}
        hidden={!isReady}
        onLoad={() => setIsReady(true)}
      />

      <h1>Title: {photo?.title}</h1>
      <p>Album ID: {photo?.albumId}</p>
      <p>
        Link: <a href={photo?.url}>{photo?.url}</a>
      </p>
    </PhotoPageContainer>
  );
};
export default PhotoPage;
