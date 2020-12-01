import React from 'react';
import type { PhotoInfo } from './PhotosPage';
import PhotoThumbnail from './PhotoThumbnail';

const PhotoThumbnails: React.FC<{
  data: PhotoInfo[];
  height: number;
  width: number;
}> = ({ data, height, width }) => {
  if (!data) return <p> Loading </p>;
  console.log(data);
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

export default PhotoThumbnails;
