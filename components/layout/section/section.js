import PropTypes from 'prop-types'
import { Box, Typography, Stack } from '@mui/material'

export const Section = ({ title, children }) => {
  return (
    <Stack
    direction={{ sm: 'column', md: 'row' }}
    spacing={{ xs: 2, sm: 2, md: 6 }}
    sx={{
        marginY: '3rem',
        '& .title': {
          xs: { textAlign: 'left' },
          md: { textAlign: 'right' },
        },
      }}
    >
      <Box sx={{
        flex: {
          sm: '0 0',
          md: `0 0 ${255 / 16}rem`
        },
        position: 'relative',
      }}>
        {
          title && (
            <Typography variant="h2" className="title" sx={{ position: 'sticky', top: '150px' }}>
              { title }
            </Typography>
          )
        }
      </Box>
      <Box sx={{ flex: '1' , wordWrap: 'break-word', minWidth: 0 }} >
          { children }
      </Box>
    </Stack>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}