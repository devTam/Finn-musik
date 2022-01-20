import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { FC, useContext } from "react"
import { ActionTypes, Album, AppContext } from "../context"
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from "react-toastify";

interface FavoriteProps {
    data: Album
}

const Favorite: FC<FavoriteProps> = (props) => {
    const { data } = props;
    const { dispatch } = useContext(AppContext);
    const imageSrc = data?.["im:image"][2]?.label;
    const albumName = data?.["im:name"].label;
    const artistName = data?.["im:artist"].label;

    const removeFavorite = (): void => {
        dispatch({ type: ActionTypes.REMOVE_FAVORITES, payload: data });
        toast.success("Removed from favorites");
    };

    return (
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={imageSrc} />
        </ListItemAvatar>
        <ListItemText
          primary={albumName}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline', fontSize: '0.8rem' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {artistName}
              </Typography>
            </>
          }
        />
        <IconButton onClick={removeFavorite}>
            <ClearIcon />
        </IconButton>
      </ListItem>
    )
}

export default Favorite;
