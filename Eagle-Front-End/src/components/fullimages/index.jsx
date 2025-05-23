import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/navigation"; // Navigation modülünün stilleri
import "swiper/css/pagination";
import { Navigation, Pagination } from 'swiper/modules';

import Image from "./Image";
import { images } from "./imageitem";

const Images = () => {
  return (
    <div>
      <Swiper  modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}  
            pagination={{ clickable: true }}  
            loop={true}>

        {
            images.map((image,index)=>(
                <SwiperSlide key={index}>
          <Image img={image} />
        </SwiperSlide>
            ))
}

      </Swiper>
    </div>
  );
};

export default Images;
