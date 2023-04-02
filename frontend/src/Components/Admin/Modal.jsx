import {
  Input,
  Button,
  Text,
  Box,
  Textarea,
  useToast,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_blogs_by_user_id_api_call,
  update_blogs_api_call,
} from "../../Redux/blogs/blogs.action";
import jwt_decode from "jwt-decode";

const ModalForEdit = ({ isOpen, setIsOpen, editData }) => {
  const { loginData } = useSelector((store) => store.User);
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
  });
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

  useEffect(() => {
    setForm(editData);
  }, [editData]);

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
    dispatch(update_blogs_api_call(form._id, { ...form, category: category }));
    // ------------ Alert----------
    toast({
      title: "Blog Updated👍",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => {
      dispatch(get_blogs_by_user_id_api_call(userData?.id));
    }, 600);

    onClose();
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent bg="#131a28" color="#ffffff">
          <ModalHeader>Edit {editData.name}</ModalHeader>
          <ModalCloseButton />

          <ModalBody
            w="100%"
            m="auto"
            mt="4"
            textAlign="left"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            fontSize={18}
          >
            {/* --------------- (Form) ---------------- */}
            <form onSubmit={handleSubmit}>
              <Text mt="3" fontWeight={500}>
                Thumbnail*
              </Text>
              <Input
                color="black"
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
                color="black"
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
                  color="black"
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
                <Checkbox
                  color="black"
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
                  color="black"
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
              </Box>
              <Checkbox
                color="black"
                ml="17%"
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
                color="black"
                pl="2"
                pr="2"
                bg="#ffff"
                borderRadius={8}
                type="checkbox"
                borderColor="grey"
                value="Lead Generation"
                onChange={handleChange}
              >
                :LeadGeneration
              </Checkbox>
              <Checkbox
                color="black"
                ml="17%"
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
              <Text mt="3" fontWeight={500}>
                Description*
              </Text>
              <Textarea
                color="black"
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
                Update Blog
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForEdit;
