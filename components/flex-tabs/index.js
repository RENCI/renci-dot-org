import { useState } from 'react';
import { styled } from '@mui/material/styles';
import academiaBg from '@/images/partnerships/academia.png';
import govAndNpBg from '@/images/partnerships/gov-and-np.png';
import industryBg from '@/images/partnerships/industry.png';
import { FlexPanel } from './flex-panel';
import { FlexPanelTitle } from './flex-panel-title';

const FlexContainer = styled('div')(props => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  height: '350px',
  width: '90%',
  maxWidth: '900px',
  margin: '2rem auto',
}));

const sectorPanels = [
  {
    id: 'academia',
    title: 'Academia',
    backgroundImageSrc: academiaBg.src,
  },
  {
    id: 'gov-and-np',
    title: 'Government & Non-profit',
    backgroundImageSrc: govAndNpBg.src,
  },
  {
    id: 'industry',
    title: 'Industry',
    backgroundImageSrc: industryBg.src,
  },
];

export const FlexTabs = () => {
  const [activeTabId, setActiveTabId] = useState(sectorPanels[0].id);

  return (
    <FlexContainer>
      {
        sectorPanels.map(panel => (
          <FlexPanel
            key={`panel-${ panel.id }` }
            role="tab"
            active={ activeTabId === panel.id }
            onClick={ () => setActiveTabId(panel.id) }
            sx={{ backgroundImage: `url("${ panel.backgroundImageSrc }")` }}
          >
            <FlexPanelTitle title="Academia" />
          </FlexPanel>
        ))
      }
      <TabPanel
    </FlexContainer>
  );
};
