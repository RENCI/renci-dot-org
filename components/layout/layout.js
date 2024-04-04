import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Head from 'next/head'
import { Container } from '@mui/material'
import { Footer } from './footer'
import { useConfig } from '../../context'
import { AppBar } from './app-bar'

export const Layout = ({ children, ourWorkTrayItems }) => {
  const { config } = useConfig()

  return (
    <Fragment>
      <Head>
        <title>RENCI.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar ourWorkTrayItems={ourWorkTrayItems} />
      <main style={{ flex: 1 }}>
        <Container maxWidth={ config.width }>
          { children }
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
