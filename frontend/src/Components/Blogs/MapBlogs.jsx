import { Box, Grid, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { CgCalendarDates } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const MapBlogs = (props) => {
  const { image, title, _id, date } = props;
  return (
    <Grid
      key={_id}
      textAlign="left"
      borderRadius={8}
      bg="#ffffff"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      _hover={{
        h: "104%",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Link to={`/details/${_id}`}>
        <Image
          borderTopRadius={8}
          w="100%"
          h={["150px", "160px", "210px", "210px"]}
          src={image}
          alt={title}
        />
      </Link>
      <Box p="4">
        <Link to={`/details/${_id}`}>
          <Heading fontSize={[15, 16, 18, 22]} lineHeight={6}>
            {title.slice(0, 64)}..
          </Heading>
        </Link>
        <Box
          display="flex"
          justifyContent="space-between"
          mt="6"
          cursor="pointer"
        >
          <Text
            display="flex"
            alignItems="center"
            gap="1"
            _hover={{ color: "#4ae2c3" }}
          >
            <CgCalendarDates /> <span>{date.slice(4, 15)}</span>
          </Text>
          <Text
            display="flex"
            alignItems="center"
            gap="1"
            _hover={{ color: "#4ae2c3" }}
          >
            <span>Start Reading </span>
            <IoIosArrowForward />
          </Text>
        </Box>
      </Box>
    </Grid>
  );
};

export default MapBlogs;
