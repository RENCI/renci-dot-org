import {
  Box,
  Collapse,
  Grow,
  Popper,
  Typography,
  styled,
  useAutocomplete,
} from "@mui/material";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { Tag } from "./tag";
import { CloseRounded } from "@mui/icons-material";

const FREE_SEARCH_LABEL = "freeSearch";

const LABELS = {
  researchGroups: "Research Groups",
  collaborations: "Collaborations",
  projects: "Projects",
  organizations: "Organizations",
  people: "People",
  postTags: "Misc",
  [FREE_SEARCH_LABEL]: "Search",
};

const AutocompleteFilterContext = createContext({});
const useAutocompleteFilterContext = () => {
  const ctx = useContext(AutocompleteFilterContext);
  if (!ctx)
    throw new Error(
      "Autocomplete components must be called within AutocompleteFilter"
    );
  return ctx;
};

export const AutocompleteFilter = forwardRef(function AutocompleteFilter(
  { children, tags, value, setValue },
  ref
) {
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
    },
  });

  const groupedValues = useMemo(
    () =>
      value.reduce((acc, val) => {
        if (typeof val === "string") {
          // modify reduce fn val param if element was a freeSolo search.
          // this is fine if the type is a string, which is passed by value
          val = {
            name: val,
            type: FREE_SEARCH_LABEL,
          };
        }
        acc[val.type] ? acc[val.type].push(val) : (acc[val.type] = [val]);
        return acc;
      }, {}),
    [value]
  );

  const deleteValue = useCallback(
    (value) => {
      setValue((prev) => {
        if (value.type === FREE_SEARCH_LABEL) {
          return prev.filter((v) => v !== value.name);
        }
        return prev.filter(
          (v) => v.name !== value.name || v.type !== value.type
        );
      });
    },
    [setValue]
  );

  const rootRef = useForkRef(ref, setAnchorEl);

  const [collapsing, setCollapsing] = useState(false);

  const clearAll = useCallback(() => {
    setCollapsing(true);
  }, [setCollapsing]);

  return (
    <AutocompleteFilterContext.Provider
      value={{
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        focused,
        popupOpen,
        anchorEl,
        inputValue,
        groupedValues,
        deleteValue,
        rootRef,
        collapsing,
        setCollapsing,
        tags,
        value,
        setValue,
        clearAll,
      }}
    >
      {children}
    </AutocompleteFilterContext.Provider>
  );
});

const Input = () => {
  const { rootRef, getRootProps, value, focused, getInputProps } =
    useAutocompleteFilterContext();

  return (
    <StyledAutocompleteRoot
      {...getRootProps()}
      ref={rootRef}
      className={focused ? "focused" : ""}
    >
      <StyledInput
        {...getInputProps()}
        placeholder="Enter filters here, e.g. iRODS, Earth Data Science..."
      />
    </StyledAutocompleteRoot>
  );
};

const FilterList = () => {
  const {
    value,
    collapsing,
    setValue,
    setCollapsing,
    groupedValues,
    deleteValue,
  } = useAutocompleteFilterContext();

  return (
    <Collapse
      in={value.length > 0 && !collapsing}
      onTransitionEnd={() => {
        if (collapsing) {
          setValue([]);
          setCollapsing(false);
        }
      }}
    >
      <TagContainer>
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
              <TypeHeading>{LABELS[type]}</TypeHeading>
              <TagFlexWrapper>
                {selectedFilters.map((filterItem, i) => (
                    <Tag
                      contents={filterItem.name}
                      key={`${filterItem}_${i}`}
                      title={filterItem.name}
                      type={type}
                      onDelete={() => {
                        deleteValue(filterItem);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          deleteValue(filterItem);
                        }
                      }}
                    />
                ))}
              </TagFlexWrapper>
            </Box>
          ))}
      </TagContainer>
    </Collapse>
  );
};

const TagSelector = () => {
  const {
    anchorEl,
    popupOpen,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    inputValue,
    setValue,
  } = useAutocompleteFilterContext();

  if (!anchorEl) return null;

  return (
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
            {groupedOptions.length > 0 ? (<>
              <TagSelectorFreeSearchPreview
                inputValue={inputValue}
                setValue={setValue}
              />
              {groupedOptions.sort((a, b) => {
                // keep researchGroups at top and postTags at bottom
                if (a.group === 'researchGroups') return -1;
                if (b.group === 'researchGroups') return 1;
                if (a.group === 'postTags') return 1;
                if (b.group === 'postTags') return -1;
                else return a.group.localeCompare(b.group);
              }).map(({ group, options, key }) => (
                <TagSelectorGroup label={LABELS[group]} key={key}>
                  {options.map((option, i) => {
                    const matches = match(option.name, inputValue, {
                      insideWords: true,
                    });
                    const parts = parse(option.name, matches);
                    const optionProps = getOptionProps({
                      option,
                      index: key + i,
                    });

                    return (
                      <StyledOption {...optionProps} key={option.slug}>
                        <Tag
                          contents={
                            <>
                              {parts.map((part, partIndex) => (
                                <span
                                  key={partIndex}
                                  style={{
                                    fontWeight: part.highlight ? 700 : 400,
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
                          inverted={optionProps["aria-selected"]}
                          type={option.type}
                        />
                      </StyledOption>
                    );
                  })}
                </TagSelectorGroup>
              ))}
            </>) : (
              <TagSelectorFreeSearchPreview
                inputValue={inputValue}
                setValue={setValue}
              />
            )}
          </StyledListbox>
        </Grow>
      )}
    </Popper>
  );
};

const TagSelectorGroup = ({
  children,
  label,
}) => (
  <Box sx={{ mb: "10px", isolation: "isolate" }}>
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
      {label}
    </TypeHeading>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        zIndex: 1,
      }}
    >
      {children}
    </Box>
  </Box>
);

const TagSelectorFreeSearchPreview = ({ inputValue, setValue }) => {
  if (inputValue === "") return null;
  return (
    <TagSelectorGroup label="Custom filter">
      <StyledOption onClick={() => { setValue(prev => [...prev, inputValue]) }}>
        <span style={{ marginRight: '8px' }}>
          Press <StyledKbd>enter</StyledKbd> to search titles with
        </span>
        <Tag contents={`"${inputValue}"`} />
      </StyledOption>
    </TagSelectorGroup>
  )
}

const ClearAllButton = () => {
  const { clearAll } = useAutocompleteFilterContext();

  return <StyledClearAllButton
    onClick={() => { clearAll() }}
  >
    <CloseRounded />
    <TypeHeading>Clear All</TypeHeading>
  </StyledClearAllButton>
}

AutocompleteFilter.Input = Input;
AutocompleteFilter.FilterList = FilterList;
AutocompleteFilter.TagSelector = TagSelector;
AutocompleteFilter.ClearAllButton = ClearAllButton;

// STYLES

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

const TagContainer = styled("div")`
  padding: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TagFlexWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

const TypeHeading = styled(Typography)`
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
`;

const StyledClearAllButton = styled("button")`
  flex: 1;
  all: unset;
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
  box-shadow: 0px 4px 30px ${grey[200]};
`;

const StyledOption = styled("li")(
  ({ theme }) => `
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
`
);

const StyledKbd = styled("kbd")`
  background-color: ${grey[100]};
  border-radius: 3px;
  border: 1px solid ${grey[300]};
  box-shadow:
    0 1px 1px ${grey[600]},
    0 2px 0 0 ${grey[100]} inset;
  color: ${grey[800]};
  display: inline-block;
  font-size: 0.85em;
  font-weight: 700;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
  text-transform: uppercase;
`