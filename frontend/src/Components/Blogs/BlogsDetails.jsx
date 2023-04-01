import { Box, Button, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import style from "./CSS/blogsdetails.module.css";
import Banner from "../../Images/logo-dark.png";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { GiTeacher } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { BiTimer } from "react-icons/bi";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { get_blogs_by_id_api_call } from "../../Redux/blogs/blogs.action";
import ModalForEdit from "./Modal";

const BlogsDetails = () => {
  const { loginData } = useSelector((store) => store.User);
  const { blogsDetails, loading, error } = useSelector((store) => store.Blogs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [useData, setUserData] = useState({});
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
  }, []);

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
    <div className={style.DetailsMainDiv}>
      <Box m="auto" justifyContent="center" display="flex" gap="4" p="2">
        <Heading>{blogsDetails?.title}</Heading>

        {/* --------- (Edit title) ---------- */}
        {useData.role === "admin" ? (
          <Text
            onClick={() => handleUpdate(blogsDetails._id, "title")}
            cursor="pointer"
            color="#dc3544"
            fontSize={26}
            mt="3"
          >
            <FaEdit title="Edit" />
          </Text>
        ) : (
          ""
        )}
      </Box>

      <h3>The Most Trusted Learning Platform.</h3>

      {/* -------------- ( Api Error ) --------------- */}
      {error ? <Heading color="red">Server error...</Heading> : ""}
      {/* -------------- ( loading ) --------------- */}
      {loading ? <Heading color="teal">Loading...</Heading> : ""}

      <Image
        mt="10"
        w="100%"
        h={["300px", "300px", "400px", "400px"]}
        src={Banner}
        alt="banner"
      />
      <div className={style.BlogsDetailsBox}>
        <div>
          <Heading mt="10" bg="rgba(0, 0, 0, 0.041)" p="4" fontSize={20}>
            <u>Overview</u>
          </Heading>

          {/* ------------------ (Description) ----------------- */}
          <Box m="auto" display="flex" gap="4">
            <Heading mt="4" pl="4" fontSize={30}>
              Blogs Description
            </Heading>

            {/* --------- (Edit Description) ---------- */}
            {useData.role === "admin" ? (
              <Text
                onClick={() => handleUpdate(blogsDetails._id, "description")}
                cursor="pointer"
                color="#dc3544"
                fontSize={21}
                mt="6"
              >
                <FaEdit title="Edit" />
              </Text>
            ) : (
              ""
            )}
          </Box>

          <Text
            whiteSpace="pre-line"
            pl="4"
            lineHeight="28px"
            fontSize={17}
            fontWeight="400"
          >
            {blogsDetails?.description}
            <a href="https://upsconline.nic.in/">
              <b> (https://upsconline.nic.in/)</b>
            </a>
          </Text>
        </div>

        {/* ------------------ ( Blogs Box ) ----------------- */}
        <div className={style.BlogsPreviewBox}>
          {/* --------------- (Thumbnail)-------------- */}
          <Image borderRadius={10} src={blogsDetails?.thumbnail} alt="thumb" />

          {/* --------- (Edit thumbnail ) ---------- */}
          {useData.role === "admin" ? (
            <Text
              onClick={() => handleUpdate(blogsDetails._id, "thumbnail")}
              p="2"
              color="#ffff"
              bg="blue"
              position="absolute"
              top="1"
              borderRadius={10}
              cursor="pointer"
              right="2"
            >
              <FaEdit title="Edit" />
            </Text>
          ) : (
            ""
          )}

          {/* --------------- (Price) --------- */}
          <Box p="5">
            <hr />
            <Box className={style.BoxBottom}>
              <Text>
                <HiOutlineCurrencyRupee />
                <b>Price</b>
              </Text>
              <Box display="flex" gap={3}>
                <Heading display="flex" gap="2" color="#3e4192" fontSize={24}>
                  Rs. {blogsDetails?.price}/-
                </Heading>

                {/* --------- (Edit price) ---------- */}
                {useData.role === "admin" ? (
                  <Text
                    onClick={() => handleUpdate(blogsDetails._id, "price")}
                    cursor="pointer"
                    color="#dc3544"
                    fontSize={18}
                    mt="1"
                  >
                    <FaEdit title="Edit" />
                  </Text>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <hr />
            {/* --------------- (Teacher) --------- */}
            <Box className={style.BoxBottom}>
              <Text>
                <GiTeacher />
                <b>Teacher</b>
              </Text>
              <Box display="flex" gap={3}>
                <Text
                  color="#606060"
                  display="flex"
                  fontSize="17"
                  alignItems="center"
                  gap="3"
                >
                  <b>{blogsDetails?.teacher}</b>
                </Text>

                {/* --------- (Edit teacher) ---------- */}
                {useData.role === "admin" ? (
                  <Text
                    onClick={() => handleUpdate(blogsDetails._id, "teacher")}
                    cursor="pointer"
                    color="#dc3544"
                    fontSize={18}
                    mt="1"
                  >
                    <FaEdit title="Edit" />
                  </Text>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            <hr />
            {/* --------------- (Duration) --------- */}
            <Box className={style.BoxBottom}>
              <Text>
                <BiTimer />
                <b>Duration</b>
              </Text>
              <Box display="flex" gap={3}>
                <Text
                  color="#606060"
                  display="flex"
                  fontSize="17"
                  alignItems="center"
                  gap="3"
                >
                  <b>{blogsDetails?.duration}</b>
                </Text>

                {/* --------- (Edit Duration) ---------- */}
                {useData.role === "admin" ? (
                  <Text
                    onClick={() => handleUpdate(blogsDetails._id, "duration")}
                    cursor="pointer"
                    color="#dc3544"
                    fontSize={18}
                    mt="1"
                  >
                    <FaEdit title="Edit" />
                  </Text>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            <hr />
            {/* --------------- (Validity) --------- */}
            <Box className={style.BoxBottom}>
              <Text>
                <AiOutlineFieldTime />
                <b>Validity</b>
              </Text>
              <Box display="flex" gap={3}>
                <Text
                  color="rgb(78, 76, 76)"
                  display="flex"
                  fontSize="17"
                  alignItems="center"
                  gap="3"
                >
                  <b>{blogsDetails?.validity}</b>
                </Text>

                {/* --------- (Edit Validity) ---------- */}
                {useData.role === "admin" ? (
                  <Text
                    onClick={() => handleUpdate(blogsDetails._id, "validity")}
                    cursor="pointer"
                    color="#dc3544"
                    fontSize={18}
                    mt="1"
                  >
                    <FaEdit title="Edit" />
                  </Text>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <hr />
          </Box>

          {/* ---------------- (Enroll Button) ---------- */}
          <Button
            bg="#3e4192"
            color="#ffff"
            fontSize={20}
            p="6"
            w="90%"
            ml="4"
            _hover={{ bg: "teal" }}
          >
            <BsCart2 />
            &nbsp; Enroll Now
          </Button>
          <Text textAlign="center" mt="3" color="#3e4192">
            <b>Share This Blogs</b>
          </Text>
        </div>
      </div>

      {/* ----------------- (Modal) ---------- */}
      <ModalForEdit
        isOpen={isModalVisible}
        setIsOpen={setIsModalVisible}
        editData={editData}
        handleShowData={handleShowData}
      />
    </div>
  );
};

export default BlogsDetails;

{
  /* <video tabindex="-1" class="video-stream html5-main-video" webkit-playsinline="" playsinline="" controlslist="nodownload" style="width: 299px; height: 168px; left: 0px; top: 0px;" src="blob:https://www.youtube.com/77f18630-87ef-4546-91dd-896344b67bab"></video> */
}
