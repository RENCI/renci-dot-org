import { styled } from "@mui/material";
import { Link } from "../link";

export function Satellite({sizes: { outerOrbitSize }}) {
  return (
    <Orbit size={outerOrbitSize}>
      <Planet orbitDiameter={outerOrbitSize}>
        150<br />papers
      </Planet>
      <Orbit size={outerOrbitSize - 250}>
      <Planet orbitDiameter={outerOrbitSize - 250}>
        224<br />researchers
      </Planet>
        <Orbit size={outerOrbitSize - 250 * 2}>
          <Planet orbitDiameter={outerOrbitSize - 250 * 2}>
            108<br />projects
          </Planet>

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
  background-color: #415b73;
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
