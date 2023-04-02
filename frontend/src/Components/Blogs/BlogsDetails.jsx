import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineBars, AiTwotoneCalendar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import {
  get_blogs_api_call,
  get_blogs_by_id_api_call,
} from "../../Redux/blogs/blogs.action";
import ModalForEdit from "./Modal";
import MapBlogs from "./MapBlogs";
import Comment from "../comments/Comment";

const BlogsDetails = () => {
  const { loginData } = useSelector((store) => store.User);
  const { blogsDetails, blogsData, error } = useSelector(
    (store) => store.Blogs
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [useData, setUserData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // -------------- (Token Decode) ---------------
  useEffect(() => {
    if (loginData) {
      setUserData(jwt_decode(loginData.token));
    }
  }, [loginData]);

  // -------------- (get blogs Details) -----------
  useEffect(() => {
    handleShowData();
    handleShowAllData();
  }, [id]);

  // -------------- ( show blogs ) -----------
  const handleShowAllData = () => {
    dispatch(get_blogs_api_call());
  };

  // ------------ ( show blogs Details ) ---------
  const handleShowData = () => {
    dispatch(get_blogs_by_id_api_call(id));
  };

  // ------------- ( update blogs with modal ) -------------
  const handleUpdate = (id, name) => {
    setIsModalVisible(true);
    setEditData({ id, name });
  };

  return (
    <Box w="80%" p="4" m="auto" mt="5rem">
      {/* -------------- ( Api Error ) --------------- */}
      {error ? <Heading color="red">Server error...</Heading> : ""}

      <Heading w="70%" m="auto">
        {blogsDetails?.title}
      </Heading>
      {/*--------- User Info----*/}
      <Heading
        display="flex"
        alignItems="center"
        gap="3"
        fontSize={16}
        mt="3"
        justifyContent="center"
      >
        <BsFillPersonFill />{" "}
        <span style={{ color: "#2377fd" }}>{blogsDetails?.user?.name}</span>{" "}
        <AiOutlineBars />
        <span style={{ color: "#2377fd" }}>
          {blogsDetails?.category?.join(",")}
        </span>{" "}
      </Heading>
      <Heading
        display="flex"
        alignItems="center"
        color="#333333"
        gap="3"
        fontSize={17}
        mt="2"
        justifyContent="center"
      >
        <AiTwotoneCalendar /> Published On: {blogsDetails?.date?.slice(4, 15)}
      </Heading>

      <Image
        mt="10"
        w="100%"
        h={["300px", "300px", "400px", "400px"]}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        src={blogsDetails?.image}
        alt="banner"
      />
      <div>
        <Heading
          textAlign="left"
          mt="10"
          bg="rgba(0, 0, 0, 0.041)"
          p="4"
          pl="10"
          color="red"
          fontSize={20}
        >
          <u>Overview</u>
        </Heading>

        {/* ------------------ (Description) ----------------- */}
        <Box m="auto" display="flex" gap="4">
          <Heading mt="4" pl="4" fontSize={30}>
            Blog Description
          </Heading>
        </Box>

        <Text
          whiteSpace="pre-line"
          pl="4"
          lineHeight="28px"
          fontSize={18}
          fontWeight="400"
          mt={10}
          textAlign="left"
        >
          {blogsDetails?.description}
        </Text>
      </div>

      {/* ----------------- (Modal) ---------- */}
      <ModalForEdit
        isOpen={isModalVisible}
        setIsOpen={setIsModalVisible}
        editData={editData}
        handleShowData={handleShowData}
      />
      {/*--------- Comments Part ----------*/}
      <Heading textAlign="left" fontSize={25} mt="20" color="#057bff">
        Leave a Comment..
      </Heading>
      <Comment blog_id={blogsDetails?._id} />

      {/* --------- Bottom Part ------ */}
      <Box mt="28">
        <Heading>Related Articles</Heading>
      </Box>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={10} mt="10">
        {blogsData &&
          blogsData.map((el) => (
            <Box
              key={el._id}
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }
            >
              <MapBlogs {...el} />
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default BlogsDetails;
