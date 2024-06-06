import React, { useState, useEffect } from 'react';
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
  const [ copySuccess, setCopySuccess ] = useState(false)

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [copySuccess])

  return (
    <div style={props.style}>
      <Typography variant="body1" sx={ styles.title }>
        { props.title }
      </Typography>
      <Typography variant="body2"
        onClick={() => copyToClipboard(props.body, setCopySuccess)}
        sx={copyable ? styles.copyableBody : styles.body}
      >
        { props.body }
        {
          copyable
          ? <ContentCopyIcon fontSize="small" sx={styles.copyIcon} className="copyIcon"/>
          : null
        }
        {copySuccess && ("Copied!")}
      </Typography>

    </div>
  )
}

