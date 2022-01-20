import { FC, useContext, useState } from "react";
import Image from "next/image";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { ActionTypes, Album, AppContext } from "../context";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";

interface AlbumProps {
  data: Album;
}

const AlbumData: FC<AlbumProps> = (props) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const {
    state: { favorites },
    dispatch,
  } = useContext(AppContext);
  const { data } = props;

  const imageSrc = data?.["im:image"][2]?.label;
  const albumName = data?.["im:name"].label;
  const artistName = data?.["im:artist"].label;
  const releaseDate = new Date(data?.["im:releaseDate"].label).getFullYear();
  const price = data?.["im:price"].label;
  const link = data?.["link"].attributes.href;

  const truncateString = (str: string, num: number): string => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const setFavorite = (): void => {
    if (isFavoriteAlbum()) {
      dispatch({ type: ActionTypes.REMOVE_FAVORITES, payload: data });
    } else {
      dispatch({ type: ActionTypes.ADD_FAVORITES, payload: data });
    }
    setIsFavorite(!isFavorite);
    toast.success(isFavoriteAlbum() ? "Removed from favorites" : "Added to favorites");
  };

  const isFavoriteAlbum = (): boolean => {
    return favorites.some((album: Album) => album.id.label === data.id.label);
  };

  const openAlbum = (): void => {
    window.open(link, "_blank");
  };

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="p" variant="h6" sx={{ fontSize: "1em" }}>
            {truncateString(albumName, 20)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ fontSize: "0.8em" }}
          >
            {truncateString(artistName, 20)}
          </Typography>
          <Box
            mt={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography component="span" variant="h6" sx={{ fontSize: ".8em" }}>
              {releaseDate}
            </Typography>
            <Typography component="span" variant="h6" sx={{ fontSize: ".8em" }}>
              {price}
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton onClick={openAlbum}>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton onClick={setFavorite}>
            {isFavoriteAlbum() ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "40%", objectFit: "cover", marginLeft: "auto" }}
        image={imageSrc}
        alt="album cover"
      />
    </Card>
  );
};

export default AlbumData;
