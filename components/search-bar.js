import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  InputAdornment,
  FormLabel,
  FormControl,
  OutlinedInput,
  styled,
} from "@mui/material";
import { Backspace as ClearIcon } from "@mui/icons-material";

const StyledAutocompleteSearch = styled("div")(
  ({ theme, bottomBorderRadius = true }) => `
    display: flex;
    border-radius: inherit;
    border-bottom-left-radius: ${bottomBorderRadius ? "inherit" : 0};
    border-bottom-right-radius: ${bottomBorderRadius ? "inherit" : 0};
  
    &.focused {
      border-color: ${theme.palette.primary.main}90;
      box-shadow: 0 0 0 3px ${theme.palette.primary.main}a0;
    }
  
    &:focus-visible {
      outline: 0;
    }
  `,
);

export const SearchBar = ({ title, searchQuery, setSearchQuery, options }) => {
  const inputRef = useRef();

  const handleClickClear = () => {
    setSearchQuery("");
    inputRef.current && inputRef.current.focus();
  }

  return (
    <FormControl
      fullWidth
      sx={{
        ".MuiInputAdornment-root": { pr: 1 },
      }}
    >
      { title && <FormLabel htmlFor="project-search-input">{ title }</FormLabel> }
      <StyledAutocompleteSearch>
        <OutlinedInput
          fullWidth
          value={searchQuery}
          id="project-search-input"
          onInput={(e) => {
            setSearchQuery(e.target.value.toLowerCase());
          }}
          inputRef={ inputRef }
          placeholder="Enter query..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear search query"
                onClick={handleClickClear}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </StyledAutocompleteSearch>
    </FormControl>
  );
};

SearchBar.propTypes = {
  title: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
