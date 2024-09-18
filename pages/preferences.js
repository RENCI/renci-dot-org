import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import { Link } from "../components";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { Page } from "../components";
import { useConfig } from "../context";

export default function Preferences() {
  const { config, changeMode, changeWidth } = useConfig();

  return (
    <Page title="Preferences" description="Customize the RENCI website UI.">
      <Typography paragraph>
        Laborum consequat voluptate culpa non non consectetur ut minim
        consectetur minim duis enim laboris elit consectetur ut. Consectetur
        aute tempor culpa fugiat qui anim ut aliqua tempor laboris dolor nulla.
        Exercitation laboris consectetur irure aliquip deserunt sint dolore
        mollit labore adipisicing eu. Reprehenderit aliqua eu qui quis ut veniam
        elit adipisicing minim veniam exercitation culpa sit sit est
        reprehenderit culpa.
      </Typography>

      <br />
      <br />

      <Typography variant="h2">Content Width</Typography>

      <ButtonGroup variant="contained" aria-label="layout width button group">
        <Button onClick={changeWidth("SMALL")}>SMALL</Button>
        <br />
        <Button onClick={changeWidth("MEDIUM")}>MEDIUM</Button>
        <br />
        <Button onClick={changeWidth("LARGE")}>LARGE</Button>
        <br />
      </ButtonGroup>

      <br />
      <br />

      <Typography variant="h2">Mode</Typography>

      <ButtonGroup variant="contained" aria-label="mode button group">
        <Button onClick={changeMode("LIGHT")}>LIGHT</Button>
        <br />
        <Button onClick={changeMode("DARK")}>DARK</Button>
        <br />
      </ButtonGroup>
    </Page>
  );
}
