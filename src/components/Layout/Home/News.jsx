import React from "react";
import Slider from "../../Common/Slider";
import news from "../../../utils/fakeNews";
import { SwiperSlide } from "swiper/react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
const News = () => {
  return (
    <Box
      sx={{
        "& .swiper-pagination-bullet": {
          backgroundColor: "myColor.lightBlack",
          opacity: 1,
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: "myColor.secondary",
        },
      }}
    >
      <Typography my={4} variant="h6" textAlign="center">
        NEWS
      </Typography>
      <Slider
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={16}
        style={{ paddingBottom: "32px" }}
        breakpoints={{
          600: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
        }}
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                backgroundColor: "myColor.lightBlack",
                color: "myColor.grey",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250px"
                  width="100%"
                  image={item.imgUrl}
                  alt="news image"
                />
                <CardContent>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      wordBreak: "break-word",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))}
      </Slider>
    </Box>
  );
};

export default News;
