import React from 'react';
import { Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyToClipboard } from '@/utils/copyToClipboard';

const styles = {
  title: {
    color: '#666676',
  },
  body: {
    color: '#666676',
    marginBottom: '8px',
    
  },
  copyableBody: {
    // color: '#666676',
    marginBottom: '1px',
    '&:active': {
      color: '#474748'
    },
    '&:hover': {
      cursor: 'pointer'
    },
    '&:hover .copyIcon': {
      opacity: 0.7,
    },
  },
  copyIcon: {
    textTransform: 'uppercase',
    marginLeft: '8px',
    opacity: 0,
    fontSize: '98%',
  },
}

export const InfoBlock = ( props ) => {
  const { copyable } = props

  return (
    <div style={props.style}>
      <Typography variant="body1" sx={ styles.title }>
        { props.title }
      </Typography>
      <Typography variant="body2"
      onClick={()=> copyToClipboard(props.body)}
      sx={copyable ? styles.copyableBody : styles.body}>
        { props.body }
        {
          copyable
          ? <ContentCopyIcon fontSize="small" sx={styles.copyIcon} className="copyIcon"/>
          : null
        }
      </Typography>

    </div>
  )
}

