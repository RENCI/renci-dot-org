import { Box, styled } from "@mui/material";

export function Satellite() {
  return (
    <Orbit size={700}>
      <Planet orbitDiameter={700}>150<br />papers</Planet>
      <Orbit size={450}>
      <Planet orbitDiameter={450}>200<br />researchers</Planet>
        <Orbit size={200}>
        <Planet orbitDiameter={200}>40<br />projects</Planet>

        </Orbit>
      </Orbit>
    </Orbit>
  );
}

const Orbit = styled("div")(({ size }) => ({
  "--orbit-diameter": `${size}px`,
  position: "relative",
  display: "grid",
  placeItems: "center",
  width: "var(--orbit-diameter)",
  height: "var(--orbit-diameter)",
  borderRadius: "50%",
  border: "3px dashed #afafaf",
}))

const Planet = styled("div")(({ orbitDiameter }) => `
  --size: 100px;
  background-color: rgb(223 50 174);
  color: white;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-align: center;
  position: absolute;
  animation: ${orbitDiameter / 8}s infinite forwards rotate;
  animation-timing-function: linear;
  box-shadow: 0px 5px 10px 0px rgba(106, 10, 79, 0.5);
 
  --radius: calc(var(--orbit-diameter) / 2);
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rotate {
    from { --angle: 0deg; }
    to { --angle: 360deg; }
  }

  transform: translate(
    calc(cos(var(--angle)) * var(--radius)),
    calc(sin(var(--angle)) * var(--radius) * -1)
  )
`);
