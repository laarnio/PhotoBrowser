import React from 'react';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  id: string;
}

const PhotoPage = () => {
  let { id } = useParams<ParamTypes>();
  return (
    <div>
      <h1>Photo id: {id}</h1>
    </div>
  );
};
export default PhotoPage;
