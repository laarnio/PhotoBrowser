export const colors: IColors = {
  brown: {
    one: '#4A2E00',
    two: '#8C5906',
    three: '#CCAB76',
    four: '#FFFAF1',
    five: '#efd1a1'
  },
  green: {
    one: '#A8DB92',
    two: '#77B75B',
    three: '#4E9231',
    four: '#2E6E12',
    five: '#164900'
  },
  takeOne: {
    primary: '#1EA896',
    secondary: '#3c8e83',
    lightBackground: '#f3f5f4'
  }
};

export type IColors = {
  brown: IColor;
  green: IColor;
  takeOne: any;
};

export type IColor = {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
};
