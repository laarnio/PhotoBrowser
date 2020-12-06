import React from 'react';
const VERSION: string = (import.meta as any).env.SNOWPACK_PUBLIC_VERSION;

const AboutPage = () => (
  <div>
    <h1>About</h1>
    Version: {VERSION}
  </div>
);
export default AboutPage;
