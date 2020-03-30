import React from "react";
import ErrorMsg from "../errorMsg/ErrorMsg";
import "./Carousel.css";

const Carousel = ({ err, photoData, activeImgIndex, handlePhotoChange }) => {
  if (err) {
    return <ErrorMsg />;
  }

  if (!photoData.length) {
    return <></>;
  }

  let isFirstImg;
  let isLastImg;

  if (activeImgIndex === 0) {
    isFirstImg = true;
  } else if (activeImgIndex === photoData.length - 1) {
    isLastImg = true;
  }

  const indicators = [...photoData].map((el, index) => {
    return (
      <img
        key={el.id}
        src={el.urls.small}
        alt={`${el.alt_description}_thumbnails`}
        className={`panel__thumbnails ${
          index === activeImgIndex ? `active` : ""
        }`}
        onClick={() => handlePhotoChange(index)}
      />
    );
  });

  let imgRow = [...photoData].map((el, index) => {
    return (
      <img
        key={index}
        className={`carousel__img ${index === activeImgIndex ? `active` : ""}`}
        src={el.urls.regular}
        alt={el.alt_description}
      />
    );
  });

  return (
    <>
      <div className="panel">
        <button
          data-testid="previous-img-button"
          className={`${isFirstImg ? "button__hide" : "button__arrow "}`}
          onClick={() => handlePhotoChange(activeImgIndex - 1)}
        >
          &#9664;
        </button>
        <div>{indicators}</div>
        <button
          data-testid="next-img-button"
          className={`${isLastImg ? "button__hide" : "button__arrow"}`}
          onClick={() => handlePhotoChange(activeImgIndex + 1)}
        >
          &#9654;
        </button>
      </div>

      <div className="carousel">
        <div
          className="carousel__slide"
          style={{
            transform: `translateX(-${(activeImgIndex / photoData.length) *
              100}%)`
          }}
        >
          {imgRow}
        </div>
      </div>
    </>
  );
};

export default Carousel;
