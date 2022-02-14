import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

import { Box, Skeleton } from "@mui/material";
import movieApi from "../../../api/movieApi";
import Slider from "../../Common/Slider";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getBanner = async () => {
      try {
        setIsLoading(true);
        const data = await movieApi.getBanner();
        setBanners(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetch banner :", error.message);
      }
    };
    getBanner();
  }, []);

  return (
    <Box>
      {isLoading && (
        <Skeleton
          sx={{ paddingTop: "50%", backgroundColor: "myColor.lightBlack" }}
          variant="rectangular"
        />
      )}
      {!isLoading && (
        <Slider
          navigation={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.maBanner}>
              <Box
                sx={{
                  paddingTop: { xs: "80%", md: "50%" },
                  backgroundImage: `url(${banner.hinhAnh})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></Box>
            </SwiperSlide>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default Banner;
