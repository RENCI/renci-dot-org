import { ErrorRounded } from "@mui/icons-material";
import { Box, Button, Typography, styled } from "@mui/material";

const red = {
  50: "#ffebee",
  100: "#ffcdd2",
  150: "#f6b6bd",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
};

export const Error = ({
  message = "We're sorry, something went wrong.",
  tryAgainMessage = "Try again",
  tryAgainCb,
  sx = {},
}) => {
  return (
    <Box
      sx={{
        backgroundColor: red[50],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        color: red[900],
        px: 2,
        py: 10,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "40ch",
          gap: 2,
        }}
      >
        <ErrorRounded fill={red[900]} fontSize="large" />
        <Typography>{message}</Typography>
        {tryAgainCb !== undefined && (
          <ErrorButton
            onClick={() => {
              tryAgainCb();
            }}
          >
            {tryAgainMessage}
          </ErrorButton>
        )}
      </Box>
    </Box>
  );
};

const ErrorButton = styled(Button)`
  color: ${red[900]};
  background-color: ${red[100]};
  border-radius: 8px;
  &:hover {
    background-color: ${red[150]};
  }
`;
