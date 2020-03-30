import React from "react";
import "./PopUpControlPanel.css";

const PopUpControlPanel = ({
  photoData,
  activeImgIndex,
  handlePhotoChange,
  closePopUp
}) => {
  let isFirstImg;
  let isLastImg;

  if (activeImgIndex === 0) {
    isFirstImg = true;
  } else if (activeImgIndex === photoData.length - 1) {
    isLastImg = true;
  }

  return (
    <div className="PopUpControlPanel">
      <button className="PopUpControlPanel__btn close" onClick={closePopUp}>
        &#10005;
      </button>
      <button
        className={`PopUpControlPanel__btn left ${
          isFirstImg ? "disabled" : ""
        }`}
        disabled={isFirstImg}
        onClick={() => handlePhotoChange(activeImgIndex - 1)}
      >
        &#8592;
      </button>
      <button
        className={`PopUpControlPanel__btn right ${
          isLastImg ? "disabled" : ""
        }`}
        disabled={isLastImg}
        onClick={() => handlePhotoChange(activeImgIndex + 1)}
      >
        &#8594;
      </button>
    </div>
  );
};

export default PopUpControlPanel;
