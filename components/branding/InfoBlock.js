import React, { useEffect, useMemo, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCopiedIcon from "@mui/icons-material/Check";
import { copyToClipboard } from "@/utils/copyToClipboard";

const styles = {
  title: { },
  body: { },
  copyableBody: {
    '.copyButton': {
      filter: 'opacity(0.0)',
      transform: 'scale(0.5)',
    },
    '&:hover .copyButton': { filter: 'opacity(0.75)', transition: 'filter 250ms' },
    '.copyButton.copied': { filter: 'opacity(0.75)', transition: 'filter 0' },
    '.copyButton.uncopied': { filter: 'opacity(0.0)' },
  },
};

const CopyButton = ({ copied = false, clickHandler }) => {
  return (
    <IconButton
      onClick={ clickHandler }
      className={ copied ? "copyButton copied" : "copyButton"}
      color={ copied ? "success" : "default" }
    >
      { copied ? <ContentCopiedIcon /> : <ContentCopyIcon /> }
    </IconButton>
  );
};

export const InfoBlock = ({
  copyable = false,
  style = {},
  title = "",
  body = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => setCopied(true);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const resetTimer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(resetTimer);
  }, [copied]);

  return (
    <div style={style}>
      <Typography variant="body1" sx={styles.title}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        onClick={() => copyToClipboard(body)}
        sx={copyable ? styles.copyableBody : styles.body}
      >
        {body}
        {copyable && <CopyButton copied={ copied } clickHandler={ handleClick } />}
      </Typography>
    </div>
  );
};
