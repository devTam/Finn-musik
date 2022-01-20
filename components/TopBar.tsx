import { FC, MouseEvent, useContext, useState } from "react";
import {
  Badge,
  Divider,
  Grid,
  IconButton,
  List,
  Popover,
  Typography,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Album, AppContext } from "../context";
import Favorite from "./Favorite";

const TopBar: FC = () => {
  const {
    state: { favorites },
  } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!favorites.length) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Grid
      container
      p={3}
      px={5}
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 2,
        backgroundColor: "#0d0d0d",
        borderBottom: "1px solid #1e1e1e",
      }}
    >
      <Grid item xs={11} alignItems="center">
        <Box
          p={1}
          sx={{ display: "inline-block", cursor: "pointer" }}
          onClick={scrollToTop}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: "Inter, san-serif", fontWeight: "bold" }}
          >
            FINN
          </Typography>
          <Typography
            color="primary"
            sx={{ fontFamily: "Inter, san-serif", fontWeight: "semi-bold" }}
          >
            Musik
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={1} textAlign="right">
        <IconButton color="secondary" onClick={handleClick} disabled={!favorites.length} aria-label="favorite-list">
          <Badge badgeContent={favorites.length} color="primary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List sx={{ width: 360, bgcolor: "background.paper" }}>
            {favorites.length > 0 &&
              favorites.map((album: Album, index: number) => (
                <div key={`${album?.id?.label}-${album?.["im:artist"]?.label}`}>
                  <Favorite data={album} />
                  {index !== favorites.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </div>
              ))}
          </List>
        </Popover>
      </Grid>
    </Grid>
  );
};

export default TopBar;
