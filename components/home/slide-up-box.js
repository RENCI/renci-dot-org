import { styled } from "@mui/material";

export function SlideUpBox({ title, children, width, height }) {
  return <Container width={width} height={height}>
    <Title>{title}</Title>
    <div>
      {children}
    </div>
  </Container>
}

const Title = styled("span")`
  display: flex;
  gap: 1ch;
  justify-content: center;
  text-align: center;
  font-weight: bold;
`;

const Container = styled("div")(({ height, width }) => `
  --height: ${height};
  --width: ${width};

  position: absolute;
  max-width: var(--width);
  max-height: var(--height);
  right: 150px;
  bottom: calc(-1 * var(--height) + 5rem);

  cursor: pointer;
  background-color: rgb(30 55 91);
  color: white;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 16px 16px 0 0;
  transition: bottom 250ms;

  & span:after {
    content: "↑"
  }

  &:hover {
    bottom: 0px;

    & span:after {
      content: "↓"
    }
  }

  @media (max-width: 800px) {
    /* font-size: 0.9rem; */
    left: 20px;
    right: 20px;
    bottom: calc(-1 * var(--height) + 5rem);
  }
`);
