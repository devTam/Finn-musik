import { useContext, useEffect } from "react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import axios from "axios";
import { Container, Divider, Typography, Box } from "@mui/material";
import MainContent from "../components/MainContent";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";
import { ActionTypes, AppContext } from "../context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: ActionTypes.SET_ALBUMS, payload: data?.entry });
  }, [dispatch, data]);

  return (
    <div>
      <ToastContainer position="bottom-center" pauseOnHover={false} autoClose={2000} />
      <TopBar />
      <Container maxWidth="lg">
        <Typography
          my={4}
          pt={18}
          variant="h4"
          textAlign="center"
          component="h1"
        >
          {data?.title?.label}
        </Typography>
        <SearchBar />
        <MainContent />
      </Container>
      <Box mb={5} mt={10} component="footer">
        <Divider />
        <Typography mt={3} textAlign="center">
          {data?.rights?.label}
        </Typography>
      </Box>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(
    "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
  );

  return {
    props: {
      data: data.feed,
    },
  };
};
