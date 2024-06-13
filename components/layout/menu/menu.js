import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Fade,
  Grid,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { OurWorkTray } from "./our-work-tray";
import { Link } from "../../";
import { Icon } from "../../";
import style from "./menu.module.css";
import { MobileMenu } from "./mobile-menu";
import { fetchOurWorkTrayItems } from "../../../lib/strapi";

//

export const Menu = ({ ourWorkTrayItems }) => {
  const mobile = useMediaQuery("(max-width: 680px)");
  const [ourWorkTrayOpen, setOurWorkTrayOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const researchGroups = ourWorkTrayItems.researchGroupCollection;
  const collaborations = ourWorkTrayItems.collaborationCollection;
  const teams = ourWorkTrayItems.teamCollection;

  useEffect(() => {
    if (!mobile) {
      setMobileMenuOpen(false);
    }
  }, [mobile]);

  return (
    <nav className={style.menuContainer}>
      {mobile ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9,
          }}
        >
          <IconButton
            size="large"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <MobileMenu
            closeHandler={() => setMobileMenuOpen(false)}
            open={mobileMenuOpen}
          />
        </Box>
      ) : (
        <ul className={style.menu}>
          <li className={style.menuItem}>
            <Link to="/" className={style.menuItemLink}>
              Home
            </Link>
          </li>
          <li className={style.menuItem}>
            <Link to="/about" className={style.menuItemLink}>
              About
            </Link>
          </li>
          <li
            className={style.menuItem}
            onMouseOver={() => setOurWorkTrayOpen(true)}
            onMouseOut={() => setOurWorkTrayOpen(false)}
            onClick={() => setOurWorkTrayOpen(false)}
          >
            <Link to="/our-work" className={style.menuItemLink}>
              Our Work &nbsp; <Icon icon="chevron-down" size={16} fill="#333" />
            </Link>
            <OurWorkTray
              open={ourWorkTrayOpen}
              researchGroups={researchGroups}
              collaborations={collaborations}
              teams={teams}
            />
          </li>
          <li className={style.menuItem}>
            <Link to="/news" className={style.menuItemLink}>
              News
            </Link>
          </li>
          <li className={style.menuItem}>
            <Link to="/people" className={style.menuItemLink}>
              People
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

// Menu.propTypes = {
//   menuItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       text: PropTypes.node,
//       path: PropTypes.string.isRequired,
//     })
//   ),
// }

//
