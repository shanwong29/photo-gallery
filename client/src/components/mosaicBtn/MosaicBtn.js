import React from "react";
import "./MosaicBtn.css";

const MosaicBtn = props => {
  const { activeImgIndex, photoData } = props;

  let isFirstImg;
  let isLastImg;

  if (activeImgIndex === 0) {
    isFirstImg = true;
  } else if (activeImgIndex === photoData.length - 1) {
    isLastImg = true;
  }

  return (
    <div className="mosaic__btn-wrapper">
      <button className="mosaic__btn close" onClick={props.closePopUp}>
        &#10005;
      </button>
      <button
        className={`mosaic__btn left ${isFirstImg ? "disabled" : ""}`}
        disabled={isFirstImg}
        onClick={() => props.handlePhotoChange(activeImgIndex - 1)}
      >
        &#8592;
      </button>
      <button
        className={`mosaic__btn right ${isLastImg ? "disabled" : ""}`}
        disabled={isLastImg}
        onClick={() => props.handlePhotoChange(activeImgIndex + 1)}
      >
        &#8594;
      </button>
    </div>
  );
};

export default MosaicBtn;
