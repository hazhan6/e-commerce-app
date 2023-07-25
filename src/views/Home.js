import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ProductsSection from "../components/productsSection";

const HomePage = () => {
  const navigate = useNavigate();

  const ads = [
    { id: 1, imageUrl: "images/electronics.png", link: "electronics" },
    { id: 2, imageUrl: "images/jewelery.png", link: "jewelery" },
    { id: 3, imageUrl: "images/mens-clothing.png", link: "men's clothing" },
    { id: 4, imageUrl: "images/womens-clothing.png", link: "women's clothing" },
  ];

  const renderCarousel = () => {
    return (
      <div className="slider mb-24 lg:px-60 md:px-40 sm:px-28">
        <Carousel
          autoPlay={true}
          showThumbs={false}
          infiniteLoop={true}
          showStatus={false}
          onClickItem={(index) => {
            navigate(`/products/${ads[index].link}`);
          }}
          renderArrowPrev={(clickHandler) => {
            return (
              <div
                className={`absolute top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={clickHandler}
              >
                <BsFillCaretLeftFill className="w-9 h-9 text-gray-800" />
              </div>
            );
          }}
          renderArrowNext={(clickHandler) => {
            return (
              <div
                className={`absolute top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={clickHandler}
              >
                <BsFillCaretRightFill className="w-9 h-9 text-gray-800" />
              </div>
            );
          }}
        >
          {ads.map((ad) => (
            <a key={ad.id} href={`/products/${ad.link}`}>
              <img src={ad.imageUrl} alt={`Add ${ad.id}`} />
            </a>
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <div className="min-h-screen mb-10">
      {renderCarousel()}
      <ProductsSection category={null} isCategoryPage={false} />
    </div>
  );
};

export default HomePage;
