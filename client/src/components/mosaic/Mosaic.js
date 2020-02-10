import React from "react";
import "./Mosaic.css";
import MosaicBtn from "../mosaicBtn/MosaicBtn";
import ErrorMsg from "../errorMsg/ErrorMsg";

const Mosaic = props => {
  if (props.err) {
    return <ErrorMsg />;
  }

  if (!props.photoData) {
    return <></>;
  }

  const { photoData, activeImgIndex, isPopUp } = props;

  let photoGrid = [...photoData].map((el, index) => {
    let imgUrl = el.urls.regular;

    return (
      <div
        key={el.id}
        className={`mosaic__items mosaic__items-${index + 1} ${
          index === activeImgIndex && isPopUp ? `active` : ``
        }`}
        style={{ backgroundImage: `url(${imgUrl})` }}
        onClick={() => props.handlePhotoChange(index)}
      ></div>
    );
  });

  return (
    <>
      <div className="mosaic">
        {photoGrid}
        {isPopUp ? (
          <MosaicBtn
            activeImgIndex={props.activeImgIndex}
            handlePhotoChange={props.handlePhotoChange}
            isPopUp={props.isPopUp}
            closePopUp={props.closePopUp}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Mosaic;
