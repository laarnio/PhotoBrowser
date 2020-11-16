import React, { useState, useEffect, FunctionComponent, Children } from 'react';
import axios from 'axios';
import PhotoThumbnail from './PhotoThumbnail';

export interface PhotoInfo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
interface Response {
  data: PhotoInfo[];
}
const photosURI = 'http://jsonplaceholder.typicode.com/photos?_page=1&_limit=3';

const PhotosPage = () => {
  const [data, setData] = useState<PhotoInfo[]>([]);

  useEffect(() => {
    axios.get(photosURI).then((res: Response) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  const Photos = () => {
    if (!data) return <p> Loading </p>;

    return (
      <div>
        {data.map((photoInfo) => (
          <PhotoThumbnail key={photoInfo.id} photoInfo={photoInfo} />
        ))}
      </div>
    );
  };

  return (
    <div>
      Photos:
      <Photos />
    </div>
  );
};
export default PhotosPage;
