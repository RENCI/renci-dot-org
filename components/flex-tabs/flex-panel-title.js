import { styled } from '@mui/material/styles';

const Container = styled('div')({
  fontSize: '150%',
  fontWeight: 'bold',
  width: '100%',
  height: '100%',
  maxHeight: '120px',
  transition: 'max-height 250ms',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

export const FlexPanelTitle = ({ title }) => {
  return (
    <Container
      className="panel-title"
    >{ title }</Container>
  );
};

