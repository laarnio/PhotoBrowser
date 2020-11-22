import React from 'react';
import Select, { SelectOption } from './common/Select';
import { useStore, State } from '../store/PhotoBrowserStore';
import Slider from 'react-input-slider';

const PhotoBrowserSettingsComponent = () => {
  const photoBrowserSettings = useStore(
    (state: State) => state.photoBrowserSettings
  );
  const photoBrowserFunctions = useStore(
    (state: State) => state.photoBrowserFunctions
  );

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

  const handleSelectChange = (thumbnailsPerPage: number) => {
    photoBrowserFunctions.setLimit(thumbnailsPerPage);
  };

  const defaultOption = thumbnailsPerPageOptions.find(
    (option) => option.value == photoBrowserSettings.limit
  );

  return (
    <div>
      <Select
        defaultOption={defaultOption}
        onChange={(thumbnailsPerPage: number) =>
          handleSelectChange(thumbnailsPerPage)
        }
        options={thumbnailsPerPageOptions}
      />
      <Slider
        axis="x"
        xstep={10}
        xmin={50}
        xmax={300}
        x={photoBrowserSettings.thumbnailSize}
        onChange={({ x }) => photoBrowserFunctions.setThumbnailSize(x)}
      />
      {photoBrowserSettings.thumbnailSize}
    </div>
  );
};

export default PhotoBrowserSettingsComponent;
