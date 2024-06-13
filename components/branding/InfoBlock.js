import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { copyToClipboard } from '@/utils/copyToClipboard';

const styles = {
  root: {
    '& .MuiSvgIcon-fontSizeSmall': {
      fontSize: '98%',
      ml: 1,
    },
    '&:hover .copyIcon': {
      opacity: 0.7,
    },
    '& .MuiTypography-body2': {
      mt: 0.5,
    }
  }
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
    <Box sx={[props.style, {...styles.root}]}>
      <Typography variant="body1">
        { props.title }
      </Typography>
      {
        copyable ? (
          <Typography variant="body2"
            onClick={() => copyToClipboard(props.body, setCopySuccess)}
          >
            { props.body }
            {
              copySuccess ? (
                <CheckCircleIcon fontSize="small" color="success" />
              ) : (
                <ContentCopyIcon fontSize="small" className="copyIcon"/>
              )
            }
          </Typography>
        ) : (
          <Typography variant="body2">{ props.body }</Typography>
        )
      }
    </Box>
  )
}

