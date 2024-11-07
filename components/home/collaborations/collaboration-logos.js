import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Doe from "./images/doe.png";
import Rti from "./images/rti.png"
import Nih from "./images/nih.png";
import Noaa from "./images/noaa.png";
import Nsf from "./images/nsf.png";
import Unc from "./images/unc.png";
import Link from "next/link";

export function CollaborationLogos() {
  return (
    <Box
      sx={{
        color: "black",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 4,
      }}
    >
      <Card
        imgSrc={Nih}
        link={"/about"}
        text={"RENCI has partnered with NIH on initiatives such as the RECOVER Data Gateway, BDC3: The Cloud IC Interoperability Framework, and GeneScreen, among others, to develop innovative solutions for data curation, cloud computing, and genetic testing. Through these collaborations, NIH and RENCI are working together to harness the power of data to drive scientific breakthroughs and improve human health."}
      /> 
      <Card
        imgSrc={Noaa}
        link={"/about"}
        text={"NOAA has partnered with RENCI on various projects, including the development of new technology and research for the Joint Hurricane Testbed (JHT) to create a \"Weather-Ready Nation.\" RENCI has also collaborated with NOAA's Office of Weather and Air Quality on a grant to enhance storm surge forecasting capabilities at the National Hurricane Center."}
      /> 
      <Card
        imgSrc={Nsf}
        link={"/about"}
        text={"The National Science Foundation (NSF) has partnered with RENCI on various projects, including the development of the SciDAS framework to support distributed, data-driven research, and the CI Compass project to accelerate the data lifecycle for NSF Major Facilities. RENCI has also collaborated with NSF on the DataBridge project to extract and use knowledge from large datasets, and the SAFE Superfacilities project to enhance the security and flexibility of science networking."}
      /> 
    </Box>
  );
}

function Card({ imgSrc, text, link }) {
  return (
    <Box
      sx={{
        background: "#fff",
        boxShadow: "0px 4px 8px 0px #00000052",
        borderRadius: "8px",
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        maxWidth: "600px",
      }}
    >
      <Box sx={{ flex: "0 0 140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
       <Image src={imgSrc} layout="fixed" alt="" />
      </Box>
       <Box>
        <Typography>{text} <Link href={link}>Learn more</Link></Typography>
        
       </Box>
    </Box>
  )
}
