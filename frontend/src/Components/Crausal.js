import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './Crausal.css'
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { Flex, Image } from '@chakra-ui/react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';


function ImageCarousel() {
  return (
    <div className="container">
      <h1 className="heading">Crop Gallery</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide >
          <Flex justifyContent={'center'} >
          <Image  src={"https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg"} alt="slide_image" />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"https://assets.thehansindia.com/h-upload/feeds/2019/07/13/195638-paddy-crop.jpg"} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image  src={"https://uploads-ssl.webflow.com/5f15898ab066ca861e269e4a/61122a185e25c3107bd3dc46_shutterstock_34776166.jpg"} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf93t8-19mS3fT-DqUoeaqNIwd98jItdGUGw&usqp=CAU"} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={'https://media.istockphoto.com/id/1154958041/photo/taking-care-of-the-crop-aerial-view-of-a-tractor-fertilizing-a-cultivated-agricultural-field.jpg?b=1&s=612x612&w=0&k=20&c=wczspMJRLem3dvVmF0xnTdi6SmkNyWaT97PxjAF0sO4='} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image  src={'https://media.istockphoto.com/id/1220432332/photo/sprouts-of-winter-rapeseed-in-spring.jpg?s=612x612&w=0&k=20&c=eprirvaQ07peREwhd9151SFt_-ELQZycUncIeUnGqBI='} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image  src={'https://cdn.pixabay.com/photo/2013/03/12/17/52/france-92946__340.jpg'} alt="slide_image" />
        </SwiperSlide>

        
        <Flex justifyContent={'center'} className="slider-controler">
          <Flex className="swiper-button-prev slider-arrow">
            <FaCaretLeft name="arrow-back-outline"></FaCaretLeft>
          </Flex>
          <Flex className="swiper-button-next slider-arrow">
            <FaCaretRight name="arrow-forward-outline"></FaCaretRight>
          </Flex>
          <Flex justifyContent={'center'} >
          <Flex   className="swiper-pagination"></Flex>
          </Flex>
        </Flex>
       
      </Swiper>
    </div>
  );
}

export default ImageCarousel;







// "https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg",
// "https://assets.thehansindia.com/h-upload/feeds/2019/07/13/195638-paddy-crop.jpg",
// "https://uploads-ssl.webflow.com/5f15898ab066ca861e269e4a/61122a185e25c3107bd3dc46_shutterstock_34776166.jpg",
// "https://imgix-prod.sgs.com/-/media/sgscorp/images/cotton-plant.cdn.en.1.jpg?fit=crop&crop=edges&auto=format&w=1200&h=630",