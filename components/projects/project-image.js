import { styled } from "@mui/material";

export const Pattern = styled("div")`
  position: relative;
  min-width: 250px;
  min-height: 150px;
  overflow: hidden;
  background-color: #9fccd5;
  background-image: linear-gradient(
      30deg,
      #e6f2f4 12%,
      transparent 12%,
      transparent 87%,
      #e6f2f4 87%,
      #e6f2f4
    ),
    linear-gradient(
      150deg,
      #e6f2f4 12%,
      transparent 12%,
      transparent 87%,
      #e6f2f4 87%,
      #e6f2f4
    ),
    linear-gradient(
      30deg,
      #e6f2f4 12%,
      transparent 12%,
      transparent 87%,
      #e6f2f4 87%,
      #e6f2f4
    ),
    linear-gradient(
      150deg,
      #e6f2f4 12%,
      transparent 12%,
      transparent 87%,
      #e6f2f4 87%,
      #e6f2f4
    ),
    linear-gradient(
      60deg,
      #b3d7dd 25%,
      transparent 25.5%,
      transparent 75%,
      #b3d7dd 75%,
      #b3d7dd
    ),
    linear-gradient(
      60deg,
      #b3d7dd 25%,
      transparent 25.5%,
      transparent 75%,
      #b3d7dd 75%,
      #b3d7dd
    );
  background-size: 40px 70px;
  background-position:
    0 0,
    0 0,
    20px 35px,
    20px 35px,
    0 0,
    20px 35px;
`;
// pointing right diamond - #9fccd5 equivalent to renci blue 60% opacity
// going horizontally across diamond - #e6f2f4 equivalent to renci blue 10% opacity
// pointing left diamond - #b3d7dd equivalent to renci blue 30% opacity
