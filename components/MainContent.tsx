import { FC, useContext } from "react";
import { Grid } from "@mui/material";
import { AppContext } from "../context";
import AlbumData from "./Album";


const MainContent: FC = () => {
  const {
    state: {
      albums,
      searched
    },
  } = useContext(AppContext);

  return (
    <Grid container mt={5} spacing={4}>
      {(searched) ? (
        <Grid item xs={12} sm={6} md={4} >
          <AlbumData data={searched} />
        </Grid>
      ) : (
        albums?.map((album) => (
          <Grid item xs={12} sm={6} md={4} key={`${album?.["im:name"].label} - ${album?.["im:artist"].label}`}>
            <AlbumData data={album} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default MainContent;
