import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ConfigContext = createContext();

const WIDTHS = { SMALL: "md", MEDIUM: "lg", LARGE: "xl" };
const MODES = { LIGHT: "LIGHT", DARK: "DARK" };

//

const ACTIONS = {
  CHANGE_WIDTH: "change-width",
  CHANGE_MODE: "change-mode",
};

//

const DEFAULT_CONFIG = {
  width: "lg",
  mode: "light",
};

//

export const ConfigProvider = ({ children }) => {
  const [width, setWidth] = useState(DEFAULT_CONFIG.width);
  const [mode, setMode] = useState(DEFAULT_CONFIG.mode);

  const config = useMemo(
    () => ({
      mode,
      width,
    }),
    [mode, width],
  );

  const changeMode = (newMode) => () => {
    if (!(newMode in MODES)) {
      return;
    }
    setMode(MODES[newMode]);
  };

  const changeWidth = (newWidth) => () => {
    if ((!newWidth) in WIDTHS) {
      return;
    }
    setWidth(WIDTHS[newWidth]);
  };

  useEffect(() => console.table(config), [config]);

  return (
    <ConfigContext.Provider
      value={{
        config,
        changeMode,
        changeWidth,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
