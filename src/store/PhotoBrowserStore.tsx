import create from 'zustand';

export type State = {
  photoBrowserSettings: PhotoBrowserSettings;
  photoBrowserFunctions: PhotoBrowserFunctions;
};
interface PhotoBrowserSettings {
  currentPage: number;
  limit: number;
  lastPage: number;
  thumbnailSize: number;
}

interface PhotoBrowserFunctions {
  nextPage: Function;
  previousPage: Function;
  setPage: Function;
  setLimit: Function;
  setLastPage: Function;
  setThumbnailSize: Function;
}

export const useStore = create<State>((set) => ({
  photoBrowserSettings: {
    currentPage: 1,
    limit: 50,
    lastPage: 1,
    thumbnailSize: 150
  },
  photoBrowserFunctions: {
    nextPage: () => set((state: State) => setNextPage(state)),
    previousPage: () => set((state: State) => setPreviousPage(state)),
    setPage: (page: number) => set((state: State) => setPage(state, page)),
    setLimit: (limit: number) => set((state: State) => setLimit(state, limit)),
    setLastPage: (lastPage: number) =>
      set((state: State) => setLastPage(state, lastPage)),
    setThumbnailSize: (newSize: number) =>
      set((state: State) => setThumbnailSize(state, newSize))
  }
}));

const setNextPage = (state: State) => {
  const newState = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      currentPage:
        state.photoBrowserSettings.currentPage + 1 >
        state.photoBrowserSettings.lastPage
          ? state.photoBrowserSettings.lastPage
          : state.photoBrowserSettings.currentPage + 1
    }
  };
  return newState;
};

const setPreviousPage = (state: State) => {
  const newState = {
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
  const newState = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      currentPage: page
    }
  };
  return newState;
};

const setLimit = (state: State, newLimit: number) => {
  const newState = {
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
  const newState = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      lastPage: newLastPage
    }
  };
  return newState;
};

const setThumbnailSize = (state: State, newSize: number) => {
  const newState = {
    ...state,
    photoBrowserSettings: {
      ...state.photoBrowserSettings,
      thumbnailSize: newSize
    }
  };
  return newState;
};
