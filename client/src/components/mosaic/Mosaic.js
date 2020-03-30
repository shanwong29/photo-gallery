import React from "react";
import "./Mosaic.css";
import PopUpControlPanel from "../popUpControlPanel/PopUpControlPanel";
import ErrorMsg from "../errorMsg/ErrorMsg";

const Mosaic = props => {
  if (props.err) {
    return <ErrorMsg />;
  }

  if (!props.photoData.length) {
    return <></>;
  }

  const { photoData, activeImgIndex, isPopUp } = props;

  let photoGrid = [...photoData].map((el, index) => {
    let imgUrl = el.urls.regular;

    return (
      <div
        key={el.id}
        className={`mosaic__items mosaic__items-${index + 1} ${
          index === activeImgIndex && isPopUp ? `enlarged` : ``
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
          <PopUpControlPanel
            photoData={photoData}
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
