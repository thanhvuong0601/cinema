import React from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  EffectCreative,
} from "swiper";
SwiperCore.use([EffectCreative, Autoplay, Pagination, Navigation]);

const Slider = ({ children, ...rest }) => {
  return <Swiper {...rest}> {children}</Swiper>;
};

export default Slider;
