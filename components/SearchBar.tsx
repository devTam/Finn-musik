import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { ActionTypes, Album, AppContext } from "../context";
import Autocomplete from "@mui/material/Autocomplete";

const SearchBar: FC<{}> = () => {
  const {
    state: { albums },
    dispatch,
  } = useContext(AppContext);

  const [options, setOptions] = useState<Album[]>([]);

  useEffect(() => {
    if (albums && albums.length) {
      setOptions(albums)
    }
  }, [albums])

  const handleChange = (
    e: SyntheticEvent<Element, Event>,
    value: Album | null
  ): void => {
    dispatch({ type: ActionTypes.SET_SEARCHED, payload: value });
  };

  const defaultProps = {
    options: options,
    getOptionLabel: (option: Album) =>
      `${option?.["im:name"].label} - ${option?.["im:artist"].label}`,
  };

  return (
    <Autocomplete
      {...defaultProps}
      id="album-search"
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Search Albums" variant="filled" />
      )}
    />
  );
};

export default SearchBar;
