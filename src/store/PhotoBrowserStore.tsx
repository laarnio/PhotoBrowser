import create from 'zustand';
import type { PhotoInfo } from 'components/PhotosPage';

export type State = {
  photoBrowserSettings: PhotoBrowserSettings;
  photoBrowserFunctions: PhotoBrowserFunctions;
  photoBrowserData: PhotoBrowserData;
};
interface PhotoBrowserSettings {
  currentPage: number;
  limit: number;
  lastPage: number;
  thumbnailSize: number;
  isPaginationSticky: boolean;
  paginationNeighbours: number;
}

interface PhotoBrowserFunctions {
  nextPage: Function;
  previousPage: Function;
  setPage: Function;
  setLimit: Function;
  setLastPage: Function;
  setThumbnailSize: Function;
  togglePaginationSticky: Function;
  setPaginationNeighbours: Function;
  setAllPhotoInfos: Function;
  setCurrentPagePhotoInfos: Function;
}

interface PhotoBrowserData {
  allPhotoInfos: PhotoInfo[];
  currentPagePhotoInfos: PhotoInfo[];
}

export const useStore = create<State>((set) => ({
  photoBrowserSettings: {
    currentPage: 1,
    limit: 50,
    lastPage: 1,
    thumbnailSize: 150,
    isPaginationSticky: true,
    paginationNeighbours: 2
  },

  photoBrowserFunctions: {
    nextPage: () => set((state: State) => setNextPage(state)),
    previousPage: () => set((state: State) => setPreviousPage(state)),
    setPage: (page: number) => set((state: State) => setPage(state, page)),
    setLimit: (limit: number) => set((state: State) => setLimit(state, limit)),
    setLastPage: (lastPage: number) =>
      set((state: State) => setLastPage(state, lastPage)),
    setThumbnailSize: (newSize: number) =>
      set((state: State) => setThumbnailSize(state, newSize)),
    togglePaginationSticky: () =>
      set((state: State) => togglePaginationSticky(state)),
    setPaginationNeighbours: (newNeighbourAmount: number) =>
      set((state: State) => setPaginationNeighbours(state, newNeighbourAmount)),
    setAllPhotoInfos: (photoInfos: PhotoInfo[]) =>
      set((state: State) => setPhotoInfos(state, photoInfos)),
    setCurrentPagePhotoInfos: (photoInfos: PhotoInfo[]) =>
      set((state: State) => setCurrentPagePhotoInfos(state, photoInfos))
  },

  photoBrowserData: {
    allPhotoInfos: [],
    currentPagePhotoInfos: []
  }
}));

const setNextPage = (state: State) => {
  const nextPage = state.photoBrowserSettings.currentPage + 1;
  let newState = state;
  if (nextPage <= state.photoBrowserSettings.lastPage) {
    newState = {
      ...state,
      photoBrowserSettings: {
        ...state.photoBrowserSettings,
        currentPage: nextPage
      }
    };
  }
  return newState;
};

const setPreviousPage = (state: State) => {
  const newState: State = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      currentPage:
        state.photoBrowserSettings.currentPage - 1 < 1
          ? 1
          : state.photoBrowserSettings.currentPage - 1
    }
  };
  return newState;
};

const setPage = (state: State, page: number) => {
  const newState: State = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      currentPage: page
    }
  };
  return newState;
};

const setLimit = (state: State, newLimit: number) => {
  const newState: State = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      currentPage: 1,
      limit: newLimit
    }
  };
  return newState;
};

const setLastPage = (state: State, newLastPage: number) => {
  const newState: State = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      lastPage: newLastPage
    }
  };
  return newState;
};

const setThumbnailSize = (state: State, newSize: number) => {
  const newState: State = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      thumbnailSize: newSize
    }
  };
  return newState;
};

const togglePaginationSticky = (state: State) => {
  const newState: State = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      isPaginationSticky: !state.photoBrowserSettings.isPaginationSticky
    }
  };
  return newState;
};

const setPaginationNeighbours = (state: State, newNeighbourAmount: number) => {
  const newState: State = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      paginationNeighbours: newNeighbourAmount
    }
  };
  return newState;
};

const setPhotoInfos = (state: State, photoInfos: PhotoInfo[]) => {
  const newState: State = {
    ...state,
    photoBrowserData: {
      ...state.photoBrowserData,
      allPhotoInfos: photoInfos
    }
  };
  return newState;
};

const setCurrentPagePhotoInfos = (state: State, photoInfos: PhotoInfo[]) => {
  const newState: State = {
    ...state,
    photoBrowserData: {
      ...state.photoBrowserData,
      currentPagePhotoInfos: photoInfos
    }
  };
  return newState;
};
