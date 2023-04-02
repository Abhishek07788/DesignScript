import {
  Box,
  Text,
  Textarea,
  Input,
  SimpleGrid,
  Button,
  Grid,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { get_comments_by_blogs_api_call } from "../../Redux/comments/comments.action";
import { useParams } from "react-router-dom";
import { add_comment_api_call } from "../../Redux/comments/comments.action";
import { delete_comments_api_call } from "../../Redux/comments/comments.action";

const Comment = () => {
  const { loginData } = useSelector((store) => store.User);
  const { commentData } = useSelector((store) => store.Comments);
  const [userData, setUserData] = useState({});
  const [input, setInput] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const toast = useToast();

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      setUserData(jwt_decode(loginData.token));
    }
  }, [loginData]);

  //----------- Add new comment --------
  const handleAdd = (e) => {
    e.preventDefault();
    const comment = {
      user_id: userData?.id,
      user: userData?.id,
      blog_id: id,
      blogs: id,
      title: value,
      time: Date(),
    };
    dispatch(add_comment_api_call(comment));

    //--------- update ui -----
    setTimeout(() => {
      getComments();
    }, 600);
    e.target.reset();
    setValue("");
  };

  //------------- get comments --------
  useEffect(() => {
    getComments();
  }, [id]);

  // ------------ ( get blog comments) ---------
  const getComments = () => {
    dispatch(get_comments_by_blogs_api_call(id));
  };

  // ------------ ( delete comment) ---------
  const handleDeleteComment = (id) => {
    dispatch(delete_comments_api_call(id));
    // ------------ Alert----------
    toast({
      title: "Comment Deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

    //--------- update ui -----
    setTimeout(() => {
      getComments();
    }, 600);
  };

  return (
    <Grid border="1px" w="85%" borderRadius={8} padding="5" mt="2" bg="#f3f7fd">
      {/* -------- message -------- */}
      {commentData &&
        commentData.map((el) => (
          <Grid
            mt="3"
            mb="4"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            key={el._id}
            bg="#eae9e9"
            w="85%"
            borderRadius={8}
            color="#444444"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p="1"
            >
              <Box
                display={["grid", "grid", "flex", "flex"]}
                textAlign={"left"}
                alignItems="center"
                gap="2"
              >
                <BsPersonCircle
                  style={{ fontSize: "25px", marginTop: "2px" }}
                />
                <u style={{ color: "#5763ee" }}>{el.user?.email}</u>
                <u>| {el.time.slice(4, 21)}</u>
              </Box>

              {userData?.id === el.user_id ? (
                <Heading
                  onClick={() => handleDeleteComment(el._id)}
                  color="red"
                  fontSize={30}
                  cursor="pointer"
                  title="Delete Comment"
                >
                  <RiDeleteBack2Fill />
                </Heading>
              ) : (
                ""
              )}
            </Box>

            <Text
              textAlign="left"
              pl={["2", "2", "10", "10"]}
              pr="4"
              pb="2"
              whiteSpace="pre-line"
              fontWeight={500}
            >
              {el.title}
            </Text>
          </Grid>
        ))}

      {/* -------------------- (Comment Part) --------- */}
      {loginData ? (
        <Grid display="flex" alignItems="center">
          <Text fontSize={40} mt="1" display={input ? "none" : "block"}>
            <BsPersonCircle />
          </Text>
          <SimpleGrid
            bg={"#ffffff"}
            width="90%"
            ml="0px"
            mt={4}
            pt="3"
            pb="5"
            borderRadius="10"
          >
            {/* ------------------- (Input) --------------------- */}
            <Input
              onClick={() => setInput(!input)}
              textAlign={"left"}
              ml="6"
              mt="0"
              w={"90%"}
              fontSize={"17"}
              display={input ? "none" : "block"}
              color="#4d545b"
              placeholder="Add Comment ..."
              borderColor="teal"
              borderRadius="30"
            />
            <form onSubmit={handleAdd}>
              <Textarea
                required
                onChange={(e) => setValue(e.target.value)}
                value={value}
                textAlign={"left"}
                ml="6"
                mt="0"
                w={"90%"}
                display={input ? "block" : "none"}
                fontSize={"17"}
                color="#4d545b"
                placeholder="Leave a comment ..."
                borderColor="teal"
                rows={"4"}
              />
              <Box display={input ? "block" : "none"}>
                {/* ----------------------- (Send - Cancel button) ------------------------------- */}
                <Box display={"flex"} gap="10" mt="5" ml="10">
                  <Button
                    type="submit"
                    bg={"#3bc8f5"}
                    color="white"
                    fontSize={"14"}
                    _hover={{
                      bg: "#0cbef9",
                      color: "white",
                    }}
                  >
                    Send
                  </Button>

                  <Button
                    onClick={() => setInput(false)}
                    fontSize={"14"}
                    color="#373a3d"
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          </SimpleGrid>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default Comment;
