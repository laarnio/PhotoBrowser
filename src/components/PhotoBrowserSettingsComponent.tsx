import React, { useState } from 'react';
import Select, { SelectOption } from './common/Select';
import { useStore, State } from '../store/PhotoBrowserStore';
import Slider from 'react-input-slider';
import styled from 'styled-components';

const ContentContainer = styled.div`
  min-width: 280px;
  float: right;
`;

const PhotoBrowserSettingsContainer = styled.div`
  position: relative;
  background-color: #eaeaea;
  padding: 16px;
  box-shadow: 0 0 10px #000000;
`;
const SettingLabelText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #5e72e4;
`;
const SliderValue = styled.var`
  color: black;
  font-size: 13px;
  display: inline-block;
`;
const Setting = styled.div``;

const PhotoBrowserSettingsComponent = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);
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
    <ContentContainer>
      <button onClick={() => setSettingsVisible(!settingsVisible)}>
        Settings
      </button>

      <PhotoBrowserSettingsContainer hidden={!settingsVisible}>
        <Setting>
          <SettingLabelText>Items per page:</SettingLabelText>
          <Select
            defaultOption={defaultOption}
            onChange={(thumbnailsPerPage: number) =>
              handleSelectChange(thumbnailsPerPage)
            }
            options={thumbnailsPerPageOptions}
          />
        </Setting>

        <Setting>
          <SettingLabelText>
            Thumbnail size:{' '}
            <SliderValue>{photoBrowserSettings.thumbnailSize}</SliderValue>
          </SettingLabelText>
          <Slider
            axis="x"
            xstep={10}
            xmin={50}
            xmax={300}
            x={photoBrowserSettings.thumbnailSize}
            onChange={({ x }) => photoBrowserFunctions.setThumbnailSize(x)}
          />
        </Setting>

        <Setting>
          <SettingLabelText>Sticky pagination footer:</SettingLabelText>
          <input
            type="checkbox"
            checked={photoBrowserSettings.isPaginationSticky}
            onChange={() => photoBrowserFunctions.togglePaginationSticky()}
          />
        </Setting>

        <Setting>
          <SettingLabelText>
            Pagination neighbours visible:{' '}
            <SliderValue>
              {photoBrowserSettings.paginationNeighbours}
            </SliderValue>
          </SettingLabelText>
          <Slider
            axis="x"
            xstep={1}
            xmin={0}
            xmax={4}
            x={photoBrowserSettings.paginationNeighbours}
            onChange={({ x }) =>
              photoBrowserFunctions.setPaginationNeighbours(x)
            }
          />
        </Setting>
      </PhotoBrowserSettingsContainer>
    </ContentContainer>
  );
};

export default PhotoBrowserSettingsComponent;
