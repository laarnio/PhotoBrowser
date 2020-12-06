import create from 'zustand';
import type { PhotoInfo } from 'components/PhotosPage';
import { apiService } from '../../src/api/api';

export type Album = {
  id: number;
  userId: number;
  title: string;
};

export type State = {
  photos: PhotoInfo[];
  albums: Album[];
  getAllPhotos: () => void;
  getAllAlbums: () => void;
  filters: {
    albumId: number | null;
    setAlbumFilter: (albumId: number) => void;
  };
  isLoadingPhotos: boolean;
  isLoadingAlbums: boolean;
  pagination: {
    currentPage: number;
    lastPage: number;
    isPaginationSticky: boolean;
    paginationNeighbours: number;
    limit: number;
    setNextPage: () => void;
    setPreviousPage: () => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setLastPage: (page: number) => void;
    togglePaginationSticky: () => void;
    setPaginationNeighbours: (amount: number) => void;
  };

  thumbnails: {
    thumbnailSize: number;
    setThumbnailSize: (size: number) => void;
  };
};

export const useStore = create<State>((set) => ({
  photos: [],
  albums: [],
  isLoadingPhotos: false,
  isLoadingAlbums: false,
  filters: {
    albumId: null,
    setAlbumFilter: (albumId: number) => {
      set((state: State) => setAlbumFilter(state, albumId));
    }
  },

  getAllPhotos: async () => {
    set((state: State) => ({
      ...state,
      isLoadingPhotos: true
    }));
    const photos = await apiService.getAllPhotos();
    set((state: State) => _setPhotos(state, photos));
    set((state: State) => ({
      ...state,
      isLoadingPhotos: false
    }));
  },
  getAllAlbums: async () => {
    set((state: State) => ({
      ...state,
      isLoadingAlbums: true
    }));
    const albums = await apiService.getAllAlbums();
    set((state: State) => _setAlbums(state, albums));
    set((state: State) => ({
      ...state,
      isLoadingAlbums: false
    }));
  },
  pagination: {
    currentPage: 1,
    lastPage: 1,
    isPaginationSticky: true,
    limit: 50,
    paginationNeighbours: 2,
    setNextPage: () => set((state: State) => setNextPage(state)),
    setPreviousPage: () => set((state: State) => setPreviousPage(state)),
    setPage: (page: number) => set((state: State) => setPage(state, page)),
    setLimit: (limit: number) => set((state: State) => setLimit(state, limit)),
    setLastPage: (lastPage: number) =>
      set((state: State) => setLastPage(state, lastPage)),
    togglePaginationSticky: () =>
      set((state: State) => togglePaginationSticky(state)),
    setPaginationNeighbours: (newNeighbourAmount: number) =>
      set((state: State) => setPaginationNeighbours(state, newNeighbourAmount))
  },
  thumbnails: {
    thumbnailSize: 150,
    setThumbnailSize: (newSize: number) =>
      set((state: State) => setThumbnailSize(state, newSize))
  }
}));

const _setPhotos = (state: State, photos: PhotoInfo[]) => {
  const newState: State = {
    ...state,
    photos,
    pagination: {
      ...state.pagination,
      lastPage: Math.ceil(photos.length / state.pagination.limit)
    }
  };

  return newState;
};

const _setAlbums = (state: State, albums: Album[]) => {
  const newState: State = {
    ...state,
    albums
  };
  return newState;
};

const setNextPage = (state: State) => {
  let newState = state;
  if (state.pagination.currentPage < state.pagination.lastPage) {
    newState = {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: state.pagination.currentPage + 1
      }
    };
  }
  return newState;
};

const setPreviousPage = (state: State) => {
  let newState = state;
  if (state.pagination.currentPage > 0) {
    newState = {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: state.pagination.currentPage - 1
      }
    };
  }
  return newState;
};

const setPage = (state: State, page: number) => {
  const newState: State = {
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: page
    }
  };

  return newState;
};

const setLimit = (state: State, newLimit: number) => {
  let newState = state;
  if (newLimit <= 500 && newLimit > 0) {
    newState = {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: 1,
        limit: newLimit,
        lastPage: Math.ceil(state.photos.length / state.pagination.limit)
      }
    };
  }
  return newState;
};

const setLastPage = (state: State, newLastPage: number) => {
  const newState: State = {
    ...state,
    pagination: {
      ...state.pagination,
      lastPage: newLastPage
    }
  };
  return newState;
};

const setThumbnailSize = (state: State, newSize: number) => {
  const newState: State = {
    ...state,
    thumbnails: {
      ...state.thumbnails,
      thumbnailSize: newSize
    }
  };
  return newState;
};

const togglePaginationSticky = (state: State) => {
  const newState: State = {
    ...state,
    pagination: {
      ...state.pagination,
      isPaginationSticky: !state.pagination.isPaginationSticky
    }
  };
  return newState;
};

const setPaginationNeighbours = (state: State, newNeighbourAmount: number) => {
  const newState: State = {
    ...state,
    pagination: {
      ...state.pagination,
      paginationNeighbours: newNeighbourAmount
    }
  };
  return newState;
};

const setAlbumFilter = (state: State, albumId: number) => {
  let newState: State = {
    ...state,
    filters: {
      ...state.filters,
      albumId: albumId
    },
    pagination: {
      ...state.pagination,
      currentPage: 1
    }
  };
  return newState;
};
