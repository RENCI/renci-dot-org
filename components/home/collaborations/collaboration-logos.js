import { Box } from "@mui/material";
import Image from "next/image";
import Doe from "./images/doe.png";
import Rti from "./images/rti.png"
import Nih from "./images/nih.png";
import Noaa from "./images/noaa.png";
import Nsf from "./images/nsf.png";
import Unc from "./images/unc.png";

export function CollaborationLogos() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={Nih} layout="fixed" alt="" />
      <Image src={Noaa} layout="fixed" alt="" />
      <Image src={Nsf} layout="fixed" alt="" />
      <Image src={Doe} layout="fixed" alt="" />
      <Image src={Rti} layout="fixed" alt="" />
      <Image src={Unc} layout="fixed" alt="" />
    </Box>
  );
}
