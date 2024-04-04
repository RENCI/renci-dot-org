import { Box, Container, Toolbar, useScrollTrigger, AppBar as MuiAppBar } from "@mui/material";
import { Link } from "../link";
import { Menu } from "./menu";
import renciLogo from "../../images/renci.png";
import { useConfig } from "context";

const HEIGHT = 120;

export const AppBar = ({ ourWorkTrayItems, homePageAppBar = false }) => {
  const { config } = useConfig();
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 400,
  });
  
  return (
    <MuiAppBar
      elevation={homePageAppBar && !scrollTrigger ? 0 : 1}
      position={homePageAppBar ? "fixed" : "sticky"}
      sx={{
      backgroundColor: homePageAppBar && !scrollTrigger ? "transparent" : "white",
      transition: 'background-color 300ms',
      height: `${HEIGHT}px`,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
    }}>
      <Container maxWidth={ config.width } sx={{ height: '100%' }}>
        <Toolbar sx={{
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          height: '100%',
        }}>
          <Link to="/">
            <Box
              sx={{
                width: '120px',
                height: '100%',
                maxWidth: '120px',
                backgroundImage: `url(${ renciLogo.src })`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
              }}
            />
          </Link>
          <Menu
            ourWorkTrayItems={ourWorkTrayItems}
          />
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
