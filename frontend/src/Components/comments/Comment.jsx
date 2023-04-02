import {
  Box,
  Text,
  Textarea,
  Input,
  SimpleGrid,
  Button,
  Grid,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const Comment = (props) => {
  const { loginData } = useSelector((store) => store.User);
  const [userData, setUserData] = useState({});
  const { blog_id } = props;
  const [input, setInput] = useState(false);
  const [value, setValue] = useState("");

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      setUserData(jwt_decode(loginData.token));
    }
  }, [loginData]);

  const handleAdd = (e) => {
    e.preventDefault();

    const comment = {
      user_id: userData?.id,
      user: userData?.id,
      blog_id: blog_id,
      blogs: blog_id,
      title: value,
      time: Date(),
    };
    console.log(comment);
    e.target.reset();
    setValue("");
  };

  return (
    <Grid border="1px" w="85%" borderRadius={8} padding="5" mt="2">
      {/* -------- message -------- */}
      <Grid bg="#eae9e9" w="85%" borderRadius={8} color="#444444">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p="1"
        >
          <Box display="flex" alignItems="center" gap="2">
            <BsPersonCircle style={{ fontSize: "25px", marginTop: "2px" }} />
            <u style={{ color: "#5763ee" }}>{"abhishek@123"}</u> |{" "}
            <u> {"2 April 12:50 pm"}</u>
          </Box>
          <Heading
            color="red"
            fontSize={30}
            cursor="pointer"
            title="Delete Comment"
          >
            <RiDeleteBack2Fill />
          </Heading>
        </Box>

        <Text
          textAlign="left"
          pl="4"
          pr="4"
          pb="2"
          whiteSpace="pre-line"
          fontWeight={500}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique,
          vitae nulla! Et odio temporibus unde, quaerat, perferendis nobis quis
          laborum odit delectus sint aspernatur sed? Soluta deserunt corrupti
          iure dolor? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Similique, vitae nulla! Et odio temporibus unde, quaerat, perferendis
          nobis quis laborum odit delectus sint aspernatur sed? Soluta deserunt
          corrupti iure dolor? Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Similique, vitae nulla! Et odio temporibus unde,
          quaerat, perferendis nobis quis laborum odit delectus sint aspernatur
          sed? Soluta deserunt corrupti iure dolor? Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Similique, vitae nulla! Et odio
          temporibus unde, quaerat, perferendis nobis quis laborum odit delectus
          sint aspernatur sed? Soluta deserunt corrupti iure dolor?
        </Text>
      </Grid>

      {/* -------------------- (Comment Part) --------- */}
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
    </Grid>
  );
};

export default Comment;
