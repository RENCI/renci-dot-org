import React from 'react'
import { Card, CardContent } from '@mui/material/'
import Image from 'next/image'

export const LogoBlock = ({logo, bgColor}) => {
  return (
    <Card elevation={3} >
      <CardContent sx={{ backgroundColor: bgColor }}>
        {/* 
          to do in future: consider using usePathname and our 
          custom Link component when upgrading to Nextjs v13 
        */}
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