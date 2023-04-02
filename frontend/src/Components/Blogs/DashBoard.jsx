import {
  Box,
  Button,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  delete_blog_api_call,
  get_blogs_api_call,
  get_blogs_by_title_api_call,
} from "../../Redux/blogs/blogs.action";
import MapBlogs from "./MapBlogs";

const DashBoard = () => {
  const { loginData } = useSelector((store) => store.User);
  const { blogsData, error } = useSelector((store) => store.Blogs);
  const [query, setQuery] = useState("");
  const [useData, setUserData] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      setUserData(jwt_decode(loginData.token));
    }
  }, [loginData]);

  // -------------- (get blogs Data) -----------
  useEffect(() => {
    handleShowData();
  }, []);

  // -------------- ( show blogs ) -----------
  const handleShowData = () => {
    dispatch(get_blogs_api_call());
  };

  // ------------ Search ----------
  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      dispatch(get_blogs_by_title_api_call(query));
    } else {
      handleShowData();
    }
  };

  // // -------------- ( delete blogs ) -----------
  // const handleDeleteBlogs = (id) => {
  //   dispatch(delete_blog_api_call(id));
  //   setTimeout(() => {
  //     handleShowData();
  //   }, 500);
  //   // ------------ Alert----------
  //   toast({
  //     title: "Blog Deleted👍",
  //     status: "success",
  //     duration: 2000,
  //     isClosable: true,
  //     position: "top",
  //   });
  // };

  return (
    <div>
      {/* ---------Main Heading------ */}
      <Box mt="5rem">
        <Heading>SalesBlink Blog</Heading>
        <Text w="100%">Sales, Cold Emails and everything in between...</Text>
      </Box>

      {/* -------------- ( Api Error ) --------------- */}
      {error ? <Heading color="red">Server error...</Heading> : ""}


      {/*------ Search --------  */}
      <Box>
        <form
          onSubmit={handleSearch}
          style={{
            width: "75%",
            display: "flex",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <Input
            type="search"
            onChange={(e) => setQuery(e.target.value)}
            borderColor="teal"
            placeholder="Search..."
          />
          <Button type="submit" colorScheme="teal">
            Search
          </Button>
        </form>
      </Box>

      {/* --------- Blogs Box ------ */}
      <SimpleGrid
        bg="#f3f7fd"
        w="80%"
        m="auto"
        columns={[1, 2, 2, 3]}
        mt="10"
        spacing={10}
      >
        {blogsData && blogsData.map((el) => <MapBlogs key={el._id} {...el} />)}
      </SimpleGrid>
    </div>
  );
};

export default DashBoard;
