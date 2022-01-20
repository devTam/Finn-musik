import { useReducer, createContext, PropsWithChildren } from "react";

// Type declarations
interface AppContext {
  state: typeof initialState;
  dispatch: (action: ACTIONTYPE) => void;
}

export interface Album {
  "im:name": { label: string };
  "im:image": { label: string; attributes: { height: string } }[];
  "im:artist": { label: string };
  "im:releaseDate": { label: Date };
  "im:price": { label: string };
  link: { attributes: { href: string } };
  id: {
    label: string;
  };
}

enum ActionTypes {
  ADD_FAVORITES = "ADD_FAVORITES",
  REMOVE_FAVORITES = "REMOVE_FAVORITES",
  SET_ALBUMS = "SET_ALBUMS",
  SET_SEARCHED = "SET_SEARCHED",
}

type ACTIONTYPE =
  | { type: ActionTypes.ADD_FAVORITES; payload: Album }
  | { type: ActionTypes.REMOVE_FAVORITES; payload: Album }
  | { type: ActionTypes.SET_ALBUMS; payload: Album[] }
  | { type: ActionTypes.SET_SEARCHED; payload: Album | null };

interface State {
  favorites: Album[];
  albums: Album[] | null;
  searched: Album | null;
};

const initialState: State = {
  favorites: [],
  albums: null,
  searched: null,
};

// Reducer

const rootReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case ActionTypes.REMOVE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (album: Album) => album.id.label !== action.payload.id.label
        ),
      };

    case ActionTypes.SET_ALBUMS:
      return {
        ...state,
        albums: action.payload,
      };

    case ActionTypes.SET_SEARCHED:
      return {
        ...state,
        searched: action.payload,
      };

    default:
      return state;
  }
};

// Context

const AppContext = createContext({} as AppContext);

const Provider = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, Provider, ActionTypes };
