import axios from 'axios';
import type { PhotoInfo } from '../components/PhotosPage';

export const apiService = {
  getAllPhotos: () => getAllPhotos(),
  getPhotoInfoById: (id: number) => getPhotoInfoById(id)
};

const getAllPhotos = (): Promise<PhotoInfo[]> => {
  const allPhotosURI = `https://jsonplaceholder.typicode.com/photos`;
  return get(allPhotosURI).then((res) => res.data);
};

const getPhotoInfoById = (id: number): Promise<PhotoInfo> => {
  const photoByIdUri = `https://jsonplaceholder.typicode.com/photos/${id}`;
  return get(photoByIdUri).then((res) => res.data);
};

const get = (url: string) => {
  return axios.get(url);
};

interface PhotoResponse {
  data: PhotoInfo[];
}
function identity<T>(arg: T): T {
  return arg;
}
