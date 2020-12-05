import React, { useState } from 'react';
import Select, { SelectOption } from './common/Select';
import { useStore, State } from '../store/PhotoBrowserStore';
import Slider from 'react-input-slider';
import styled from 'styled-components';
import { colors } from '../assets/other/colors';
import { FiSettings } from 'react-icons/fi';

const ContentContainer = styled.div`
  grid-column: 12/12;
  place-items: center;
`;

const SettingsButton = styled.button`
  padding: 6px 5px 4px 6px;
  background-color: ${colors.brown.secondaryTwo};
  color: ${colors.brown.secondaryOne};
  border: none;
  border-radius: 5px;
  font-weight: 700;

  :hover {
    background-color: ${colors.brown.secondaryOne};
    color: ${colors.brown.secondaryTwo};
  }
`;

const PhotoBrowserSettingsContainer = styled.div`
  position: absolute;
  transition: all 0.05s linear;

  ${(props: { visible: boolean }) =>
    props.visible ? 'transform: scaleY(1) ' : 'transform: scaleY(0);'};
  overflow: hidden;
  right: 64px;
  background-color: ${colors.brown.secondaryTwo};
  padding: 16px;
  box-shadow: 0 0 10px #000000;
  color: ${colors.brown.secondaryOne};
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

const PhotoBrowserSettingsComponent = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const store = useStore((state: State) => state);

  const handleSelectChange = (thumbnailsPerPage: number) => {
    store.pagination.setLimit(thumbnailsPerPage);
  };

  const defaultOption = store.thumbnails.thumbnailsPerPageOptions.find(
    (option) => option.value == store.pagination.limit
  );
  console.log(defaultOption);

  return (
    <ContentContainer>
      <SettingsButton onClick={() => setSettingsVisible(!settingsVisible)}>
        <FiSettings size={20} />
      </SettingsButton>

      <PhotoBrowserSettingsContainer visible={settingsVisible}>
        <Setting>
          <SettingLabelText>Items per page:</SettingLabelText>
          <Select
            defaultOption={defaultOption}
            onChange={(thumbnailsPerPage: number) =>
              handleSelectChange(thumbnailsPerPage)
            }
            options={store.thumbnails.thumbnailsPerPageOptions}
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
    </ContentContainer>
  );
};

export default PhotoBrowserSettingsComponent;
