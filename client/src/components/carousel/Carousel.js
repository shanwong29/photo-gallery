import React from "react";
import ErrorMsg from "../errorMsg/ErrorMsg";
import "./Carousel.css";

const Carousel = props => {
  if (props.err) {
    return <ErrorMsg />;
  }

  if (!props.photoData) {
    return <></>;
  }

  let { photoData, activeImgIndex } = props;
  activeImgIndex = parseInt(activeImgIndex, 10);

  let isFirstImg;
  let isLastImg;

  if (activeImgIndex === 0) {
    isFirstImg = true;
  } else if (activeImgIndex === photoData.length - 1) {
    isLastImg = true;
  }

  const indicators = [...props.photoData].map((el, index) => {
    return (
      <img
        src={el.urls.small}
        alt={el.alt_description}
        className={`panel__thumbnails ${
          index === activeImgIndex ? `active` : ""
        }`}
        onClick={() => props.handlePhotoChange(index)}
      />
    );
  });

  let imgRow = [...props.photoData].map((el, index) => {
    return (
      <img
        key={index}
        data-testid="display-img"
        className={`carousel__img ${index === activeImgIndex ? `active` : ""}`}
        src={el.urls.regular}
        alt={el.alt_description}
      />
    );
  });

  return (
    <div>
      <div className="panel">
        <button
          data-testid="previous-img-button"
          className={`${isFirstImg ? "button__hide" : "button__arrow "}`}
          onClick={() => props.handlePhotoChange(activeImgIndex - 1)}
        >
          &#9664;
        </button>
        <div>{indicators}</div>
        <button
          data-testid="next-img-button"
          className={`${isLastImg ? "button__hide" : "button__arrow"}`}
          onClick={() => props.handlePhotoChange(activeImgIndex + 1)}
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
    </div>
  );
};

export default Carousel;
