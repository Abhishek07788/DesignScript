import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import style from "./CSS/dashboard.module.css";
import { CgCalendarDates } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import {
  delete_blog_api_call,
  get_blogs_api_call,
  get_blogs_by_title_api_call,
} from "../../Redux/blogs/blogs.action";

const DashBoard = () => {
  const { loginData } = useSelector((store) => store.User);
  const { blogsData, error, dataLoading } = useSelector((store) => store.Blogs);
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
  const handleSearch = () => {
    dispatch(get_blogs_by_title_api_call(query));
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
      <div className={style.mainDiv}>
        <Heading>SalesBlink Blog</Heading>
        <p>Sales, Cold Emails and everything in between...</p>
      </div>

      {/* -------------- ( Api Error ) --------------- */}
      {error ? <Heading color="red">Server error...</Heading> : ""}
      {/* -------------- ( data loading ) --------------- */}
      {dataLoading ? <Heading color="teal">Loading...</Heading> : ""}

      {/*------ Search --------  */}
      <Box w="80%" display="flex" m="auto" mt="4">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          borderColor="teal"
          placeholder="Search..."
        />
        <Button onClick={handleSearch} colorScheme="teal">
          Search
        </Button>
      </Box>

      {/* --------- Blogs Box ------ */}
      <SimpleGrid w="80%" m="auto" columns={[1, 2, 2, 3]} mt="10" spacing={10}>
        {blogsData &&
          blogsData.map((el) => (
            <Grid
              key={el._id}
              textAlign="left"
              borderRadius={8}
              bg="#ffffff"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
              _hover={{
                h: "104%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Image
                borderTopRadius={8}
                w="100%"
                h="100%"
                src={el.image}
                alt={el.title}
              />
              <Box p="4">
                <Heading fontSize={22} lineHeight={6}>
                  {el.title.slice(0, 64)}..
                </Heading>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt="6"
                  cursor="pointer"
                >
                  <Text
                    display="flex"
                    alignItems="center"
                    gap="1"
                    _hover={{ color: "#4ae2c3" }}
                  >
                    <CgCalendarDates /> <span>{el.date.slice(4, 15)}</span>
                  </Text>
                  <Text
                    display="flex"
                    alignItems="center"
                    gap="1"
                    _hover={{ color: "#4ae2c3" }}
                  >
                    <span>Start Reading </span>
                    <IoIosArrowForward />
                  </Text>
                </Box>
              </Box>
            </Grid>
          ))}
      </SimpleGrid>
    </div>
  );
};

export default DashBoard;
