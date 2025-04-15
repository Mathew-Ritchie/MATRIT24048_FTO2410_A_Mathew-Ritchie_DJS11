import React from "react";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./show-carousel.css";

export default function ShowCarousel({ shows, deviceType }) {
  console.log("Shows prop received:", shows);

  const responsive = {
    xxldesktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      slidesToSlide: 3, // optional, default to 1.
    },
    xldesktop: {
      breakpoint: { max: 1960, min: 1024 },
      items: 6,
      slidesToSlide: 3,
    },
    ldesktop: {
      breakpoint: { max: 1700, min: 1024 },
      items: 5,
      slidesToSlide: 3,
    },
    mdesktop: {
      breakpoint: { max: 1450, min: 1024 },
      items: 4,
      slidesToSlide: 3,
    },
    sdesktop: {
      breakpoint: { max: 1200, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    stablet: {
      breakpoint: { max: 700, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="transform 10000ms ease"
      partialVisible={true}
      // transitionDuration={5000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "stablet", "mobile"]}
      deviceType={deviceType}
      // dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-20-px"
    >
      {shows.map((show) => (
        <Link to={`/show/${show.id}`} className="show-link">
          <div key={show.id} className="show-carousel-div">
            <p className="carousel-show-title">{show.title}</p>
            {console.log(show)}
            {show.image && (
              <img
                src={show.image}
                alt={show.title}
                style={{ maxWidth: "250px", height: "auto" }}
              />
            )}
          </div>
        </Link>
      ))}
    </Carousel>
  );
}
