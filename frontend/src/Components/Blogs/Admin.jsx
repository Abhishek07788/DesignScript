import {
  Heading,
  Input,
  Button,
  Text,
  Box,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_blogs_api_call,
  get_blogs_api_call,
} from "../../Redux/blogs/blogs.action";
import jwt_decode from "jwt-decode";

const initialState = {
  image: "",
  title: "",
  description: "",
};

const Admin = () => {
  const { loginData } = useSelector((store) => store.User);
  const [form, setForm] = useState(initialState);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      setUserData(jwt_decode(loginData.token));
    }
  }, [loginData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      add_blogs_api_call({
        ...form,
        date: Date(),
        userid: userData.id,
        user: userData.id,
      })
    );
    setTimeout(() => {
      dispatch(get_blogs_api_call());
    }, 500);
    // ------------ Alert----------
    toast({
      title: "Blog Added👍",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    e.target.reset();
  };

  return (
    <div>
      <Heading mt="100" color="teal">
        Admin Panel
      </Heading>
      <Box
        w="50%"
        m="auto"
        mt="4"
        textAlign="left"
        p="10"
        borderRadius="20"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        bg="#ffede3"
        border={"2px"}
      >
        {/* --------------- (Form) ---------------- */}
        <form onSubmit={handleSubmit}>
          <Text mt="3" fontWeight={500}>
            Thumbnail*
          </Text>
          <Input
            bg="#ffff"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image.."
            borderBottom="1px"
          />

          <Text mt="3" fontWeight={500}>
            Title*
          </Text>
          <Input
            bg="#ffff"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title.."
            required
            borderBottom="1px"
          />

          <Text mt="3" fontWeight={500}>
            Description*
          </Text>
          <Textarea
            bg="#ffff"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description.."
            required
            borderBottom="1px"
          ></Textarea>
          <Button type="submit" w="100%" bg="teal" color="#ffff" mt="10">
            Add Blogs
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Admin;
