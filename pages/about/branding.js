import {
  Link, Page, Section, Block, ColorSection, LogoSection
} from '../../components'
import { Typography } from '@mui/material'

// Logos
import Logo from '../../images/branding/png/standard/renci-logo.png'
import LogoAlt from '../../images/branding/png/standard/renci-logo-alt.png'
import LogoBlack from '../../images/branding/png/standard/renci-logo-black.png'
import LogoGray from '../../images/branding/png/standard/renci-logo-gray.png'
import LogoWhite from '../../images/branding/png/standard/renci-logo-white.png'
import LogoSimple from '../../images/branding/png/simple/renci-logo-simple.png'
import LogoAltSimple from '../../images/branding/png/simple/renci-logo-alt-simple.png'
import LogoBlackSimple from '../../images/branding/png/simple/renci-logo-black-simple.png'
import LogoGraySimple from '../../images/branding/png/simple/renci-logo-gray-simple.png'
import LogoWhiteSimple from '../../images/branding/png/simple/renci-logo-white-simple.png'
import ClearSpaceLogo from '../../images/branding/clearspace-logo.png'

export default function Branding() {
  const renciColors = {
    primary: {
      renciBlue: { name: 'RENCI Blue', hex: '#00758D', },
      lightGrey: { name: 'Slate', hex: '#F3F3F8', },
      darkGrey: { name: 'Granite', hex: '#474748', },
      black: { name: 'Charcoal', hex: '#231F20', },
    },
    secondary: {
      secondaryBlue: { name: 'Ultramarine', hex: '#00A9C4', },
      lightBlue: { name: 'Frost', hex: '#D6E8F2', },
      darkBlue: { name: 'Twilight', hex: '#14385F', },
      blueGrey: { name: 'Stone', hex: '#666676', },
    },
  }

  const standardLogos = [
    { image: Logo, bgColor: '#fff', },
    { image: LogoBlack, bgColor: '#fff', },
    { image: LogoAlt, bgColor: renciColors.primary.renciBlue.hex, },
    { image: LogoGray, bgColor: renciColors.primary.black.hex, },
    { image: LogoWhite, bgColor: renciColors.primary.black.hex, },
  ]
  const simpleLogos = [
    { image: LogoSimple, bgColor: '#fff', },
    { image: LogoBlackSimple, bgColor: '#fff', },
    { image: LogoAltSimple, bgColor: renciColors.primary.renciBlue.hex, },
    { image: LogoGraySimple, bgColor: renciColors.primary.black.hex, },
    { image: LogoWhiteSimple, bgColor: renciColors.primary.black.hex, },
  ]

  return (
    <Page
      title="Branding"
    >
      <Typography paragraph>
        The elements below are used to create the core and expanded visual identity
        of RENCI. Reference each section below to learn more about proper usage and
        application in order to ensure the brand is applied consistently across all
        branded materials.
      </Typography>

      <Section title="RENCI Logo">
        <Typography paragraph>
          The RENCI logo is the bedrock of our visual identity. This logo should be used
          on all deliverable materials. Consistent use of the RENCI logo will enhance
          recognition by all audiences. For light backgrounds, the primary logo uses
          RENCI blue (#00758D) for the r, e, i, and the comet above the i, and black
          (#231F20) for the n and c. Solid black and RENCI blue are acceptable in certain
          cases. For dark backgrounds, the secondary logo uses RENCI blue (#00758D)
          for the r, e, i, and the comet above the i, and white (#FFFFFF) for the n and c.
          Solid white is acceptable in certain cases.
        </Typography>

        <LogoSection logos={ standardLogos }/>

        <Typography variant="h3">Usage</Typography>
        <ul>
          <li>The logo must be reproduced from high-resolution digital artwork.</li>
          <li>As the primary visual identity for RENCI, the logo must appear on all communications,
            including brochures, stationary, business cards, and websites.</li>
          <li>The logo may not be reconstructed or altered in any way. This prohibition includes,
            but is not restricted to, type, color, comet, outlines and embellishments. Do not create
            secondary logos, as this confuses the audiences and hinders our purpose of creating a
            consistent, reinforcing identity.</li>
          <li>The logo may not be cut or cropped in any way.</li>
        </ul>
        <Typography variant="h3">Clear Space Requirements</Typography>
        <Typography paragraph>
          To ensure the integrity and visual impact of the logo, the appropriate “clear
          space” must be maintained on all sides. Specifically, where “x” is equal to the
          height of the RENCI logo, there must be a minimum of 1/2 the distance “x”
          between the outside edge of the logo and any other page element, including
          the edge of the page.
        </Typography>

        <LogoSection logos={[{ image: ClearSpaceLogo, bgColor: '#fff', },]}/>

        <Typography variant="h3">Logo Elements</Typography>
        <Typography paragraph>
          The RENCI comet element can only be 3 colors: white (#FFFFFF), black (#231F20), or
          RENCI blue (#00758D).
        </Typography>
      </Section>

      <Section title="Colors">
        <Typography paragraph>
          The RENCI brand uses both a primary and secondary color palette. The primary
          color palette should be used predominantly on materials, while the secondary color
          palette should be used sparingly as accents to complement the primary palette.
          RENCI blue (#00758D) is the main color of RENCI and must be used at least 10%
          on all designs.
        </Typography>

        <Typography variant="h3">Primary Palette</Typography>
        <ColorSection colors={ renciColors.primary }/>
        <br/>
        <Typography variant="h3">Secondary Palette</Typography>
        <ColorSection colors={ renciColors.secondary }/>

      </Section>

    </Page>
  )
}

// there is no data needed for this page, but this is a workaround to prevent getInitialProps from
// running on this client page
export const getStaticProps = () => {
  return { props: { dummyValue: 1 }}
}