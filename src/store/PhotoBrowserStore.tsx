import create from 'zustand';
import type { PhotoInfo } from 'components/PhotosPage';
import { apiService } from '../../src/api/api';
import type { SelectOption } from 'components/common/Select';

export type State = {
  photos: PhotoInfo[];
  setPhotos: (photos: PhotoInfo[]) => void;
  getAllPhotos: () => void;

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
    thumbnailsPerPageOptions: SelectOption[];
    addThumbnailPerPageOption: (newOptions: SelectOption) => void;
    setThumbnailSize: (size: number) => void;
  };
};

const thumbnailsPerPageOptions: SelectOption[] = [
  {
    value: 10,
    label: '10'
  },
  {
    value: 20,
    label: '20'
  },
  {
    value: 50,
    label: '50'
  },
  {
    value: 100,
    label: '100'
  },
  {
    value: 500,
    label: '500'
  }
];

export const useStore = create<State>((set) => ({
  photos: [],
  setPhotos: (photos: PhotoInfo[]) =>
    set((state: State) => setPhotos(state, photos)),
  getAllPhotos: async () => {
    const photos = await apiService.getAllPhotos();
    set((state: State) => setPhotos(state, photos));
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
    thumbnailsPerPageOptions: thumbnailsPerPageOptions,
    addThumbnailPerPageOption: (newOption: SelectOption) =>
      set((state: State) => addThumbnailPerPageOption(state, newOption)),
    setThumbnailSize: (newSize: number) =>
      set((state: State) => setThumbnailSize(state, newSize))
  }
}));

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
  if (newLimit < 500 && newLimit > 0) {
    newState = {
      ...state,
      pagination: {
        ...state.pagination,
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

const setPhotos = (state: State, photos: PhotoInfo[]) => {
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

const addThumbnailPerPageOption = (state: State, newOption: SelectOption) => {
  const newState: State = {
    ...state,
    thumbnails: {
      ...state.thumbnails,
      thumbnailsPerPageOptions: state.thumbnails.thumbnailsPerPageOptions.concat(
        newOption
      )
    }
  };
  return newState;
};
