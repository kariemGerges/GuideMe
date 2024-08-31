import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import { carouselItems } from '../../data/carouselData'
import { Link } from 'react-router-dom';

// import Swiper from 'swiper';
// import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
// import { Scrollbar } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

function Home() {

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow bg-cover bg-center HomePagePicture relative ">
        <div className="absolute inset-0 flex flex-col justify-end items-center p-4 space-y-4">
          < Link to="/whatsguideme">
            <button type="button"  className="bg-black text-white py-2 px-6 rounded-full text-lg learnStartedbtn">
              LEARN MORE!
              </button>
          </Link>
        </div>
      </div>
      <div className="h-1/4 backgroundColor flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold unlockSeamleas m-4">
            UNLOCK SEAMLESS JOURNEYS
          </h1>
          <button className="bg-black text-white py-2 px-6 rounded-full m-4 text-lg">
            GET STARTED
          </button>
      </div>
      
      <div className="container p-4">
          <Carousel className="w-full carouselImg">
            {carouselItems.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image.src}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>{image.altText}</h3>
                      <p>{image.caption}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
            ))}
          </Carousel>

          {/* <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
            disableOnInteraction: false,
          }}  
            pagination={{
            clickable: true,
          }}
            navigation={true}
            className="mySwiper w-full carouselImg"
          > */}
          {/* <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {carouselItems.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.altText}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      </div>

      <div className="inset-0 flex flex-col justify-end items-center p-4 space-y-4">
          < Link to="/whatsguideme">
          <button type="button"  className="bg-black text-white py-2 px-6 rounded-full text-lg learnStartedbtn">
            LEARN MORE!
            </button>
          </Link>
      </div>
      

      <div className='container'>
        <p className='text-center text-black text-lg m-2 p-2 text-justify  '>
          What sets GuideMe apart is its comprehensive approach. 
          It not only suggests travel options but also includes guided tours, 
          immersive VR experiences, and practical details like currency exchange. 
          By offering a complete travel solution in a single app, GuideMe eliminates 
          the need for multiple platforms, providing a user-friendly and efficient planning 
          experience.
        </p>
      </div>

    </div>
  );
}

export default Home;