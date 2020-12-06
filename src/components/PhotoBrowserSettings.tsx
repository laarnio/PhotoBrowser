import React, { useState } from 'react';
import Select, { SelectOption } from './common/Select';
import { useStore, State } from '../store/PhotoBrowserStore';
import Slider from 'react-input-slider';
import styled from 'styled-components';
import { FiSettings } from 'react-icons/fi';

const SettingsButton = styled.button`
  border: none;
  padding: 3px 4px 1px 4px;
  background-color: ${(props) => props.theme.teal.one};
  color: ${(props) => props.theme.teal.five};

  border-radius: 5px;
  grid-column: 12/12;

  :hover {
    background-color: ${(props) => props.theme.teal.three};
    color: ${(props) => props.theme.teal.one};
  }
`;

const PhotoBrowserSettingsContainer = styled.div`
  position: absolute;
  z-index: 999;
  ${(props: { visible: boolean }) => (props.visible ? '' : 'display: none')};
  right: 0px;
  background-color: ${(props) => props.theme.lightOne};
  padding: 16px;
  box-shadow: 0 0 10px #000000;
  color: ${(props) => props.theme.secondary};
`;
const SettingLabelText = styled.p`
  margin: 0;
  font-size: 12px;
`;
const SliderValue = styled.var`
  color: black;
  font-size: 13px;
  display: inline-block;
`;
const Setting = styled.div``;

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

const PhotoBrowserSettings = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const store = useStore((state: State) => state);

  const handleSelectChange = (thumbnailsPerPage: string) => {
    store.pagination.setLimit(parseInt(thumbnailsPerPage));
  };

  let defaultOption = thumbnailsPerPageOptions.find(
    (option) => option.value == store.pagination.limit
  );

  return (
    <>
      <SettingsButton onClick={() => setSettingsVisible(!settingsVisible)}>
        <FiSettings size={20} />
      </SettingsButton>

      <PhotoBrowserSettingsContainer visible={settingsVisible}>
        <Setting>
          <SettingLabelText>Items per page:</SettingLabelText>
          <Select
            defaultOption={defaultOption}
            onChange={(thumbnailsPerPage: string) =>
              handleSelectChange(thumbnailsPerPage)
            }
            options={thumbnailsPerPageOptions}
          />
        </Setting>

        <Setting>
          <SettingLabelText>
            Thumbnail size:{' '}
            <SliderValue>{store.thumbnails.thumbnailSize}</SliderValue>
          </SettingLabelText>
          <Slider
            axis="x"
            xstep={10}
            xmin={50}
            xmax={300}
            x={store.thumbnails.thumbnailSize}
            onChange={({ x }) => store.thumbnails.setThumbnailSize(x)}
          />
        </Setting>

        <Setting>
          <SettingLabelText>Sticky pagination footer:</SettingLabelText>
          <input
            type="checkbox"
            checked={store.pagination.isPaginationSticky}
            onChange={() => store.pagination.togglePaginationSticky()}
          />
        </Setting>

        <Setting>
          <SettingLabelText>
            Pagination neighbours visible:{' '}
            <SliderValue>{store.pagination.paginationNeighbours}</SliderValue>
          </SettingLabelText>
          <Slider
            axis="x"
            xstep={1}
            xmin={0}
            xmax={4}
            x={store.pagination.paginationNeighbours}
            onChange={({ x }) => store.pagination.setPaginationNeighbours(x)}
          />
        </Setting>
      </PhotoBrowserSettingsContainer>
    </>
  );
};

export default PhotoBrowserSettings;
