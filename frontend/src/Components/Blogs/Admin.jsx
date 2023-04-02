import {
  Heading,
  Input,
  Button,
  Text,
  Box,
  Textarea,
  useToast,
  Checkbox,
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
  const [category, setCategory] = useState([]);
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
    const { type, checked, name, value } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setCategory([...category, value]);
      } else {
        setCategory(category.filter((el) => el !== value));
      }
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.length === 0) {
      // ------------ Alert----------
      toast({
        title: "Please Check At least one checkBox!!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(
        add_blogs_api_call({
          ...form,
          date: Date(),
          userid: userData.id,
          user: userData.id,
          category: category,
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
    }
  };

  return (
    <div>
      <Heading mt="100" color="teal">
        Admin Panel
      </Heading>
      <Box
        w="60%"
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
          <Box mt="5" display="flex" gap={3} alignItems="center">
            <Text fontWeight={500}>Category:</Text>
            <Checkbox
              type="checkbox"
              borderColor="grey"
              value="Marketing"
              onChange={handleChange}
            >
              Marketing
            </Checkbox>
            <Checkbox
              type="checkbox"
              borderColor="grey"
              value="Sales"
              onChange={handleChange}
            >
              Sales:
            </Checkbox>
            <Checkbox
              type="checkbox"
              borderColor="grey"
              value="Lead Generation"
              onChange={handleChange}
            >
              Lead Generation
            </Checkbox>
            <Checkbox
              type="checkbox"
              borderColor="grey"
              value="Sales Tips"
              onChange={handleChange}
            >
              Sales Tips:
            </Checkbox>
            <Checkbox
              type="checkbox"
              borderColor="grey"
              value="Sales Book Summary"
              onChange={handleChange}
            >
              Sales Book Summary:
            </Checkbox>
          </Box>

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
