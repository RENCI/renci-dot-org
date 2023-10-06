import {
  Box,
  Chip,
  Collapse,
  Divider,
  Grow,
  Popper,
  Typography,
  styled,
  useAutocomplete,
} from "@mui/material";
import { useNews } from "../context";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import { CloseRounded } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const FREE_SEARCH_LABEL = "freeSearch";

const getDisplayData = (type) =>
  ({
    researchGroups: {
      bgColor: "#a6ffd4",
      color: "#2d4339",
      label: "Research Groups",
    },
    collaborations: {
      bgColor: "#ffe69c",
      color: "#473f28",
      label: "Collaborations",
    },
    projects: {
      bgColor: "#ccb7ff",
      color: "#352f44",
      label: "Projects",
    },
    organizations: {
      bgColor: "#aaeeff",
      color: "#2c3e43",
      label: "Organizations",
    },
    people: {
      bgColor: "#ffc0dd",
      color: "#523c46",
      label: "People",
    },
    postTags: {
      bgColor: "#d8d8d8",
      color: "#414141",
      label: "Misc",
    },
    [FREE_SEARCH_LABEL]: {
      bgColor: "#d8d8d8",
      color: "#414141",
      label: "Search",
    }
  }[type]);

export const AutocompleteFilter = forwardRef(function AC(_, ref) {
  const { tags, newFilters: value, setNewFilters: setValue } = useNews();

  const options = useMemo(
    () =>
      Object.entries(tags).reduce((acc, [type, items]) => {
        acc.push(...items.map((item) => ({ ...item, type })));
        return acc;
      }, []),
    [tags]
  );

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    popupOpen,
    anchorEl,
    setAnchorEl,
    inputValue,
  } = useAutocomplete({
    id: "news-filter-autocomplete",
    options,
    getOptionLabel: (option) => option.name ?? option,
    value,
    onChange: (_event, newValue) => setValue(newValue),
    multiple: true,
    freeSolo: true,
    groupBy: (option) => option.type,
    isOptionEqualToValue: (opt, val) => {
      const optName = typeof opt === "string" ? opt : opt.name;
      const valName = typeof val === "string" ? val : val.name;
      return optName === valName;
    }
  });

  const groupedValues = useMemo(
    () =>
      value.reduce((acc, val) => {
        if (typeof val === "string") {
          // modify reduce fn val param if element was a freeSolo search. 
          // this is fine if the type is a string, which is passed by value
          val = {
            name: val,
            type: FREE_SEARCH_LABEL
          }
        }
        acc[val.type] ? acc[val.type].push(val) : (acc[val.type] = [val]);
        return acc;
      }, {}),
    [value]
  );

  const deleteValue = useCallback((value) => {
    setValue((prev) => {
      if (value.type === FREE_SEARCH_LABEL) {
        return prev.filter((v) => v !== value.name);
      }
      return prev.filter((v) => v.name !== value.name || v.type !== value.type)
    });
  }, [setValue])

  const rootRef = useForkRef(ref, setAnchorEl);

  const [collapsing, setCollapsing] = useState(false);

  return (
    <>
      <FilterRoot>
        <StyledAutocompleteRoot
          {...getRootProps()}
          ref={rootRef}
          bottomBorderRadius={value.length === 0}
          className={focused ? "focused" : ""}
        >
          <StyledInput
            {...getInputProps()}
            placeholder="Enter filters here, e.g. iRODS, Earth Data Science..."
          />
        </StyledAutocompleteRoot>

        {true && (
          <Collapse
            in={value.length > 0 && !collapsing}
            onTransitionEnd={() => {
              if (collapsing) {
                setValue([]);
                setCollapsing(false);
              }
            }}
          >
            <StyledDivider />
            <TagContainer>
              <ClearAllButton
                onClick={() => {
                  setCollapsing(true);
                }}
              >
                <CloseRounded />
                <TypeHeading>Clear All</TypeHeading>
              </ClearAllButton>

              {Object.entries(groupedValues)
                .sort(([a], [b]) => {
                  // sort so groups always appear on screen in same order, regardless
                  // of the order of the `value` (and `groupedValues`) objects. Keep
                  // `freeSearch` group always at the top of the list.
                  if (a === FREE_SEARCH_LABEL) return -1;
                  if (b === FREE_SEARCH_LABEL) return 1;
                  else return a.localeCompare(b);
                })
                .map(([type, selectedFilters]) => (
                  <Box key={type}>
                    <TypeHeading>{getDisplayData(type).label}</TypeHeading>
                    <TagFlexWrapper>
                      <TransitionGroup>
                        {selectedFilters.map((filterItem) => (
                          <Collapse
                            key={filterItem.slug}
                            orientation="horizontal"
                            timeout={{ appear: 200, enter: 200, exit: 100 }}
                          >
                            <Chip
                              label={filterItem.name}
                              key={filterItem.slug}
                              size="small"
                              title={filterItem.name}
                              deleteIcon={
                                <CloseRounded
                                  sx={{
                                    transform: "scale(0.8)",
                                    transformOrigin: "center",
                                    strokeWidth: 0,
                                    fill: getDisplayData(type).color,
                                  }}
                                />
                              }
                              sx={{
                                backgroundColor: getDisplayData(type).bgColor,
                                color: getDisplayData(type).color,
                                borderRadius: "6px",
                                cursor: "revert",
                                border: `1px solid ${
                                  getDisplayData(type).color
                                }90`,
                                maxWidth: "35ch",
                              }}
                              onDelete={() => { deleteValue(filterItem) }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  deleteValue(filterItem)
                                }
                              }}
                            />
                          </Collapse>
                        ))}
                      </TransitionGroup>
                    </TagFlexWrapper>
                  </Box>
                ))}
            </TagContainer>
          </Collapse>
        )}
      </FilterRoot>

      {/* Selection list */}
      {anchorEl && (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          slots={{ root: StyledPopper }}
          sx={{ width: anchorEl.clientWidth + 32 }}
          transition
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              timeout={{ appear: 250, enter: 250, exit: 0 }}
            >
              <StyledListbox {...getListboxProps()}>
                {groupedOptions.length > 0 ? (
                  groupedOptions.map(({ group, options, key }) => (
                    <Box key={key} sx={{ mb: "10px", isolation: "isolate" }}>
                      <TypeHeading
                        sx={{
                          padding: "8px 0px",
                          position: "sticky",
                          top: 0,
                          backgroundColor: "white",
                          zIndex: 2,
                          WebkitTransform: "translate3d(0,0,0)", // mobile safari bug https://css-tricks.com/forums/topic/safari-for-ios-z-index-ordering-bug-while-scrolling-a-page-with-a-fixed-element/
                        }}
                      >
                        {getDisplayData(group).label}
                      </TypeHeading>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "4px",
                          zIndex: 1,
                        }}
                      >
                        {options.map((option, i) => {
                          const matches = match(option.name, inputValue, {
                            insideWords: true,
                          });
                          const parts = parse(option.name, matches);

                          return (
                            <StyledOption
                              {...getOptionProps({ option, index: key + i })}
                              key={option.slug}
                              sx={{
                                '&[aria-selected=true] .MuiChip-root' : {
                                  backgroundColor: getDisplayData(option.type).color,
                                  color: getDisplayData(option.type).bgColor,
                                }  
                              }}
                            >
                              <Chip
                                label={
                                  <>
                                    {parts.map((part, partIndex) => (
                                      <span
                                        key={partIndex}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                    {option.numOfPosts > 1 ? (
                                      <span> ({option.numOfPosts})</span>
                                    ) : null}
                                  </>
                                }
                                size="small"
                                sx={{
                                  backgroundColor: getDisplayData(option.type)
                                    .bgColor,
                                  color: getDisplayData(option.type).color,
                                  borderRadius: "inherit",
                                  cursor: "revert",
                                  border: `1px solid ${
                                    getDisplayData(option.type).color
                                  }90`,
                                }}
                              />
                            </StyledOption>
                          );
                        })}
                      </Box>
                    </Box>
                  ))
                ) : (
                  <StyledNoOptions>No results</StyledNoOptions>
                )}
              </StyledListbox>
            </Grow>
          )}
        </Popper>
      )}
    </>
  );
});

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const FilterRoot = styled("div")`
  display: flex;
  flex-direction: column;

  border-radius: 8px;
  color: ${grey[500]};
  border: 1px solid ${grey[200]};
  box-shadow: 0px 2px 2px ${grey[50]};
`;

const StyledDivider = styled(Divider)`
  border-bottom: 1px solid ${grey[200]};
`;

const TagContainer = styled("div")`
  padding: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TagFlexWrapper = styled("div")`
  & > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;
  }
`;

const TypeHeading = styled(Typography)`
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
`;

const ClearAllButton = styled("button")`
  all: unset;
  position: absolute;
  top: 6px;
  right: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;

  & {
    p {
      font-size: 0.7rem;
      text-transform: uppercase;
      color: ${grey[500]};
      transition: color 250ms;
    }
    svg {
      transform: scale(0.5) translateY(0.5px);
      transform-origin: center;
      color: ${grey[500]};
    }
  }
  
  &:hover {
    p {
      color: ${grey[900]};
      transition: color 250ms;
    }
    svg {
      color: ${grey[900]};
    }
  }
`;

const StyledAutocompleteRoot = styled("div")(
  ({ theme, bottomBorderRadius = true }) => `
  display: flex;
  border-radius: inherit;
  border-bottom-left-radius: ${bottomBorderRadius ? "inherit" : 0};
  border-bottom-right-radius: ${bottomBorderRadius ? "inherit" : 0};

  &.focused {
    border-color: ${theme.palette.primary.main}90;
    box-shadow: 0 0 0 3px ${theme.palette.primary.main}a0;
  }

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInput = styled("input")`
  font-size: 1rem;
  color: ${grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;

  &::placeholder {
    color: ${grey[300]};
  }
  &:placeholder-shown {
    text-overflow: ellipsis;
  }
`;

const StyledPopper = styled("div")`
  position: relative;
  z-index: 1001;
`;

const StyledListbox = styled("ul")`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 0px 16px 6px 16px;
  margin: 12px 0;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  background: white;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  box-shadow: 0px 4px 30px ${
    grey[200]
  };
`

const StyledOption = styled("li")(({ theme }) => (`
  list-style: none;
  cursor: default;
  min-width: 0; /* fix "text-overflow: ellipsis" */
  border-radius: 6px;
  transition: filter 250ms;
  
  &:hover {
    cursor: pointer;
    transition: filter 250ms;
    filter: brightness(1.1);
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 2px ${theme.palette.primary.main}a0;
  }
`))

const StyledNoOptions = styled("li")`
  list-style: none;
  padding: 14px 0 8px 0;
  cursor: default;
`;
