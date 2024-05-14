import React from 'react'
import { Card, CardContent } from '@mui/material/'
import Image from 'next/image'

// to do: 
// consider using usePathname and our custom 
// Link component when upgrading to Nextjs v13

const styles = {
  card: {
    padding: 0,
    margin: '16px'
  },
  topper: {
    borderBottom: `1px solid grey`,
  },
  content: {
    backgroundColor: 'white',
  },
}

export const LogoBlock = ({logo, bgColor}) => {
  return (
    <Card sx={ styles.card }>
      <CardContent sx={{ ...styles.topper, backgroundColor: bgColor }}>
        <a
          href={logo.src} 
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image 
            src={ logo.src } 
            alt="Logo" 
            width={logo.width}
            height={logo.height}
            layout="responsive"
            objectFit='cover'
          />
        </a>
      </CardContent>
    </Card>
  )
}