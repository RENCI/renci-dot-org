import { Box, Container, Grid, useTheme } from '@mui/material'
import { Link } from '../link'
import renciLogo from '../../images/renci.png'

export const Footer = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        background: '#ddd',
        padding: '1rem 0',
        color: theme.palette.text.primary,
        '& .link-group': {
          paddingTop: '1rem',
        },
        '& .link-list': {
          padding: 0,
          listStyleType: 'none',
          '& li': {
            marginBottom: '0.5rem',
          }
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={ 12 } md={ 12 } lg={ 6 }>
            <Box>
              <Box component="span" sx={{
                display: 'block',
                minHeight: '60px',
                minWidth: '120px',
                backgroundImage: `url(${ renciLogo.src })`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0% 50%',
              }} />
              <p>
                RENCI <br />
                Europa Center <br />
                100 Europa Drive, Suite 540 <br />
                Chapel Hill, NC  27517
              </p>
            </Box>
            <p>media@renci.org</p>
            <p>919-445-9640</p>
          </Grid>
          <Grid item xs={ 12 } md={ 4 } lg={ 2 } className="link-group">
            <strong>Partners</strong>
            <ul className="link-list">
              <li><Link to="https://www.unc.edu/">UNC-Chapel Hill</Link></li>
              <li><Link to="https://www.ncsu.edu/">NC State University</Link></li>
              <li><Link to="https://duke.edu/">Duke University</Link></li>
            </ul>
          </Grid>
          <Grid item xs={ 12 } md={ 4 } lg={ 2 } className="link-group">
            <strong>Connect</strong>
            <ul className="link-list">
              <li><Link to="https://www.twitter.com/RENCI">Twitter</Link></li>
              <li><Link to="https://www.facebook.com/renci.org">Facebook</Link></li>
              <li><Link to="https://www.linkedin.com/company/65321">LinkedIn</Link></li>
              <li><Link to="https://www.youtube.com/RENCIMedia">YouTube</Link></li>
            </ul>
          </Grid>
          <Grid item xs={ 12 } md={ 4 } lg={ 2 } className="link-group">
            <strong>More</strong>
            <ul className="link-list">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/about/branding">Branding</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="https://dashboard.renci.org/">RENCI Dashboard</Link></li>
            </ul>
          </Grid>
          <Grid item xs={ 12 } style={{ textAlign: 'center', padding: '1rem' }}>
            &copy; { new Date().getFullYear() }
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}