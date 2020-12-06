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
  },
  teal: {
    one: '#dae5e5',
    two: '#b5cacb',
    three: '#90b0b0',
    four: '#6b9596',
    five: '#467b7c',
    six: '#3f6f70',
    seven: '#386263',
    eight: '#2a4a4a',
    nine: '#1c3132',
    ten: '#0e1919'
  }
};

export type IColors = {
  brown: IColor;
  green: IColor;
  takeOne: any;
  teal: IColor;
};

export type IColor = {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six?: string;
  seven?: string;
  eight?: string;
  nine?: string;
  ten?: string;
};
