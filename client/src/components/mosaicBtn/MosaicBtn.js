import React from "react";
import "./MosaicBtn.css";

const MosaicBtn = props => {
  const { activeImgIndex } = props;
  return (
    <div className="mosaic__btn-wrapper">
      <button className="mosaic__btn close" onClick={props.closePopUp}>
        &#10005;
      </button>
      <button
        className="mosaic__btn left"
        onClick={() => props.handlePhotoChange(activeImgIndex + 1)}
      >
        &#8594;
      </button>
      <button
        className="mosaic__btn right"
        onClick={() => props.handlePhotoChange(activeImgIndex + 1)}
      >
        &#8592;
      </button>
    </div>
  );
};

export default MosaicBtn;
