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
  display: ${(props:{hidden: boolean}) => props.hidden ? 'none': 'block'}
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

const PhotoPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justiify-content: center;
`;
const PhotoPageHeader = styled.div`
  padding: 2rem;
  width: 100%;
`;
const LeftContainer = styled.div`
  flex: 0 1 250px;
  margin 5px;
`;
const MainContainer = styled.div`
  flex: 1 1 250px;
  margin: 5px;
`;

const PhotoLink = styled.a`
  @media (max-width: 430px) {
    display: none;
  }
`;
const ShortenPhotoLink = styled.a`
  display: none;
  @media (max-width: 430px) {
    display: inline-block;
  }
`;

const PhotoPage = () => {
  let { id } = useParams<ParamTypes>();
  const photoInfoFromStore = useStore((state: State) =>
    state.photoBrowserData.allPhotoInfos.find(
      (photoInfo) => photoInfo.id === parseInt(id)
    )
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


  const shortenedUrl = photoInfo?.url
    .slice(0, photoInfo.url.length - 10)
    .concat('...');

  return (
    <PhotoPageContainer>
      <PhotoPageHeader>
        <h1>{photoInfo?.title}</h1>
      </PhotoPageHeader>
      <LeftContainer>
        <p>Album ID: {photoInfo?.albumId}</p>
        <p>
          Link:
          <PhotoLink href={photoInfo?.url}>{photoInfo?.url}</PhotoLink>
          <ShortenPhotoLink href={photoInfo?.url}>
            {shortenedUrl}
          </ShortenPhotoLink>
        </p>
      </LeftContainer>
      <MainContainer>
        <Photo src={photoInfo?.thumbnailUrl} hidden={isReady} />
        <Photo src={photoInfo?.url} hidden={!isReady} onLoad={() => setIsReady(true)}/>
      </MainContainer>
    </PhotoPageContainer>
  );
};
export default PhotoPage;
