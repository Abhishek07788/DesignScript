import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AddNew from "./AddNewBlog";
import UserDetails from "./UserDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_blog_api_call,
  get_blogs_by_user_id_api_call,
} from "../../Redux/blogs/blogs.action";
import jwt_decode from "jwt-decode";
import ModalForEdit from "./Modal";

const UpdateBlog = () => {
  const { userBlogData } = useSelector((store) => store.Blogs);
  const { loginData } = useSelector((store) => store.User);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      getUserBlog();
    }
  }, [loginData]);

  const getUserBlog = () => {
    if (loginData) {
      dispatch(get_blogs_by_user_id_api_call(jwt_decode(loginData.token).id));
    }
  };

  // -------------- ( delete blogs ) -----------
  const handleDeleteBlogs = (id) => {
    dispatch(delete_blog_api_call(id));
    setTimeout(() => {
      getUserBlog();
    }, 600);
    // ------------ Alert----------
    toast({
      title: "Blog Deleted👍",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  // ------------- ( update blogs with modal ) -------------
  const handleUpdate = (el) => {
    setIsModalVisible(true);
    setEditData(el);
  };

  return (
    <SimpleGrid>
      <Box
        bg="#565e59"
        p="2"
        borderRadius="8"
        w="75%"
        display="flex"
        alignItems="center"
        m="auto"
        mt="100"
        justifyContent="space-between"
      >
        <Heading color="#ffffff">Admin Panel</Heading>
        <Button colorScheme="linkedin" onClick={() => setHide(!hide)}>
          {hide ? "Hide Form" : "Add New Blog"}
        </Button>
      </Box>
      {/* ------------ Toggle ---- */}
      {hide ? <AddNew setHide={setHide} /> : ""}
      <UserDetails />

      <Box
        w="70%"
        m="auto"
        fontSize={16}
        mb="20"
        h="400px"
        overflow="auto"
        borderBottom="1px"
      >
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Date</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {userBlogData &&
            userBlogData.map((el) => (
              <tbody key={el._id}>
                <tr>
                  <td>
                    <Image
                      w="100px"
                      h="50px"
                      ml="4"
                      src={el.image}
                      alt={el.title}
                    />
                  </td>
                  <td>{el.title.slice(0, 60)}..</td>
                  <td>{el.date.slice(4, 21)}</td>
                  <td>{el.category.join(",")}</td>
                  <td onClick={() => handleUpdate(el)}>
                    <u style={{ color: "blue" }} title="Delete Blog?">
                      Edit
                    </u>
                  </td>
                  <td onClick={() => handleDeleteBlogs(el._id)}>
                    <u style={{ color: "red" }} title="Delete Blog?">
                      Delete
                    </u>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </Box>

      {/* ----------------- (Modal) ---------- */}
      <ModalForEdit
        isOpen={isModalVisible}
        setIsOpen={setIsModalVisible}
        editData={editData}
      />
    </SimpleGrid>
  );
};

export default UpdateBlog;
