import React from "react";
import "./Mosaic.css";
import PopUpControlPanel from "../popUpControlPanel/PopUpControlPanel";
import ErrorMsg from "../errorMsg/ErrorMsg";

const Mosaic = ({
  err,
  photoData,
  activeImgIndex,
  handlePhotoChange,
  isPopUp,
  closePopUp
}) => {
  if (err) {
    return <ErrorMsg />;
  }

  if (!photoData.length) {
    return <></>;
  }

  let photoGrid = [...photoData].map((el, index) => {
    let imgUrl = el.urls.regular;

    return (
      <div
        key={el.id}
        className={`mosaic__items mosaic__items-${index + 1} ${
          index === activeImgIndex && isPopUp ? `enlarged` : ``
        }`}
        style={{ backgroundImage: `url(${imgUrl})` }}
        onClick={() => handlePhotoChange(index)}
      ></div>
    );
  });

  return (
    <>
      <div className="mosaic">
        {photoGrid}
        {isPopUp ? (
          <PopUpControlPanel
            photoData={photoData}
            activeImgIndex={activeImgIndex}
            handlePhotoChange={handlePhotoChange}
            closePopUp={closePopUp}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Mosaic;
