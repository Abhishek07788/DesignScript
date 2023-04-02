import { Box, Button, Grid, Heading, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { ClearFunc, logoutFunc } from "../../Redux/user/user.action";
import { get_comments_by_user_api_call } from "../../Redux/comments/comments.action";

const UserDetails = () => {
  const { commentCount } = useSelector((store) => store.Comments);
  const { loginData } = useSelector((store) => store.User);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      dispatch(get_comments_by_user_api_call(jwt_decode(loginData.token).id));
      setUserData(jwt_decode(loginData.token));
    }
  }, [loginData]);

  // --------------- (Log out) -------------------
  const handleLogout = () => {
    const check = window.confirm("Are you sure you want to Log out?");
    if (check) {
      dispatch(logoutFunc());
      // ------------ Alert----------
      toast({
        title: "Log out Successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        dispatch(ClearFunc());
      }, 600);
      setUserData({});
    }
  };

  return (
    <Grid w="70%" m="auto" mt="10">
      <Heading
        fontSize={24}
        textAlign="left"
        bg="teal"
        color="#ffffff"
        borderTopRadius={8}
        p="2"
      >
        Account Details & Your Blogs:
      </Heading>
      <Box fontSize={20}>
        <table>
          <tbody>
            <tr>
              <td>{userData?.name}</td>
              <td>
                <u style={{ color: "blue" }}>{userData?.email}</u>
              </td>
              <td>{userData?.role}</td>
              <td>Comments: {commentCount}</td>
              <td>
                <Button
                  onClick={handleLogout}
                  colorScheme="red"
                  title="logout?"
                >
                  LogOut
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Grid>
  );
};

export default UserDetails;
