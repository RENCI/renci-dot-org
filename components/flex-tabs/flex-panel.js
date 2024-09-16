import { styled } from '@mui/material/styles';

export const FlexPanel = styled('div')(({ active }) => ({
  color: 'darkslategray',
  borderRadius: 4,
  flex: active ? 2 : 1,
  backgroundColor: '#eee',
  transition: 'flex 250ms, background-color 250ms',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  '.panel-title': {
    maxHeight: active ? '100%' : '120px',
    backgroundColor: active ? '#cded' : '#efed',
  },
  '&:hover .panel-title': {
    maxHeight: active ? '100%' : '50%',
  }
}));
