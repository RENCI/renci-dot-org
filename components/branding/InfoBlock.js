import React, { useEffect, useMemo, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCopiedIcon from "@mui/icons-material/Check";
import { copyToClipboard } from "@/utils/copyToClipboard";

const styles = {
  title: {
    color: "#666676",
  },
  body: {
    color: "#666676",
    marginBottom: "8px",
  },
  copyableBody: {
    // color: '#666676',
    marginBottom: "1px",
    "&:active": {
      color: "#474748",
    },
    "&:hover": {
      cursor: "pointer",
    },
    '.copyButton': {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    "&:hover .copyButton": {
      opacity: 0.7,
    },
  },
};

const CopyButton = ({ copied = false, clickHandler }) => {
  return (
    <IconButton
      onClick={ clickHandler }
      className="copyButton"
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
        {copyable && <CopyButton clickHandler={ handleClick } copied={ copied } />}
      </Typography>
    </div>
  );
};
