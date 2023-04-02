import {
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
  get_blogs_by_user_id_api_call,
} from "../../Redux/blogs/blogs.action";
import jwt_decode from "jwt-decode";

const initialState = {
  image: "",
  title: "",
  description: "",
};

const AddNewBlog = ({ setHide }) => {
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
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
        dispatch(get_blogs_by_user_id_api_call(userData?.id));
      }, 600);
      // ------------ Alert----------
      toast({
        title: "Blog Added👍",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      e.target.reset();
      setHide(false);
    }
  };

  return (
    <Box
      w="65%"
      m="auto"
      mt="4"
      textAlign="left"
      p="10"
      borderRadius="20"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      bg="#c1c5d0"
      border={"2px"}
      fontSize={18}
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
          placeholder="Image url.."
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
            pl="2"
            pr="2"
            bg="#ffff"
            borderRadius={8}
            type="checkbox"
            borderColor="grey"
            value="Marketing"
            onChange={handleChange}
          >
            :Marketing
          </Checkbox>
          <Checkbox
            pl="2"
            pr="2"
            bg="#ffff"
            borderRadius={8}
            type="checkbox"
            borderColor="grey"
            value="Sales"
            onChange={handleChange}
          >
            :Sales
          </Checkbox>
          <Checkbox
            pl="2"
            pr="2"
            bg="#ffff"
            borderRadius={8}
            type="checkbox"
            borderColor="grey"
            value="Education"
            onChange={handleChange}
          >
            :Education
          </Checkbox>
          <Checkbox
            pl="2"
            pr="2"
            bg="#ffff"
            borderRadius={8}
            type="checkbox"
            borderColor="grey"
            value="Lead Generation"
            onChange={handleChange}
          >
            :Lead Generation
          </Checkbox>
          <Checkbox
            pl="2"
            pr="2"
            bg="#ffff"
            borderRadius={8}
            type="checkbox"
            borderColor="grey"
            value="Sales Tips"
            onChange={handleChange}
          >
            :SalesTips
          </Checkbox>
          <Checkbox
            pl="2"
            pr="2"
            bg="#ffff"
            borderRadius={8}
            type="checkbox"
            borderColor="grey"
            value="Sales Book Summary"
            onChange={handleChange}
          >
            :SalesSummary
          </Checkbox>
        </Box>

        <Text mt="3" fontWeight={500}>
          Description*
        </Text>
        <Textarea
          rows={5}
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
  );
};

export default AddNewBlog;
