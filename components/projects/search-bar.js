import React from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  InputAdornment,
  FormLabel,
  FormControl,
  OutlinedInput,
  styled,
} from "@mui/material";
import { Backspace as ClearIcon } from '@mui/icons-material'

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
  `
);

export const SearchBar = ({ searchQuery, setSearchQuery, options }) => {
  const handleClickClear = () => setSearchQuery('')

  return (
    <FormControl fullWidth sx={{
      '.MuiInputAdornment-root': { pr: 1 }
    }}>
      <FormLabel htmlFor="project-search-input">Project Search</FormLabel>
      <StyledAutocompleteSearch>
        <OutlinedInput
          fullWidth
          value={ searchQuery }
          id="project-search-input"
          onInput={(e) => {
            setSearchQuery(e.target.value.toLowerCase());
          }}
          placeholder="Search..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear search query"
                onClick={ handleClickClear }
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
  setSearchQuery: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
