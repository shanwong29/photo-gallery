import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import PopUpControlPanel from "./PopUpControlPanel";
import { mockGetPhotoResponse } from "../../service/__mocks__/mockGetPhotoResponse";

import { render, fireEvent } from "@testing-library/react";

describe("PopUpControlPanel Test", () => {
  // *****************************    Below: set up for each test    **********************************

  const mockPhotoData = mockGetPhotoResponse.results;
  const randomImgIndex = Math.floor(Math.random() * mockPhotoData.length);
  const handlePhotoChange = jest.fn();
  const closePopUp = jest.fn();

  const createTestProps = props => {
    return {
      photoData: mockPhotoData,
      activeImgIndex: randomImgIndex,
      handlePhotoChange,
      closePopUp,
      ...props
    };
  };

  let props;
  const mockRender = props => {
    return render(
      <BrowserRouter>
        <PopUpControlPanel {...props} />
      </BrowserRouter>
    );
  };

  // ************************************************************************************************

  describe("rendering", () => {
    it("render without crashing", () => {
      const div = document.createElement("div");
      props = createTestProps({});
      ReactDOM.render(
        <BrowserRouter>
          <PopUpControlPanel {...props} />
        </BrowserRouter>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });

    describe("onclick function", () => {
      let previousImgBtn;
      let nextImgBtn;
      let selectedImgIndex;

      describe("when the first img is selected", () => {
        beforeEach(() => {
          selectedImgIndex = 0;
          props = createTestProps({ activeImgIndex: selectedImgIndex });
          const { getByText } = mockRender(props);
          previousImgBtn = getByText(/\u2190/i);
          nextImgBtn = getByText(/\u2192/i);
        });

        afterEach(() => {
          handlePhotoChange.mockClear();
        });

        it("onclick on `previous-img-button` should NOT trigger `handlePhotoChange` fn", () => {
          fireEvent.click(previousImgBtn);
          expect(handlePhotoChange.mock.calls.length).toEqual(0);
        });

        it("onclick on `next-img-button` should trigger `handlePhotoChange` fn", () => {
          fireEvent.click(nextImgBtn);
          expect(handlePhotoChange.mock.calls.length).toEqual(1);
          expect(handlePhotoChange).toHaveBeenCalledWith(selectedImgIndex + 1);
        });
      });

      describe("when the last img is selected", () => {
        beforeEach(() => {
          selectedImgIndex = mockPhotoData.length - 1;
          props = createTestProps({ activeImgIndex: selectedImgIndex });
          const { getByText } = mockRender(props);
          previousImgBtn = getByText(/\u2190/i);
          nextImgBtn = getByText(/\u2192/i);
        });

        afterEach(() => {
          handlePhotoChange.mockClear();
        });

        it("onclick on `next-img-button` should NOT trigger `handlePhotoChange` fn", () => {
          fireEvent.click(nextImgBtn);
          expect(handlePhotoChange.mock.calls.length).toEqual(0);
        });

        it("onclick on `previous-img-button` should trigger `handlePhotoChange` fn", () => {
          fireEvent.click(previousImgBtn);
          expect(handlePhotoChange.mock.calls.length).toEqual(1);
          expect(handlePhotoChange).toHaveBeenCalledWith(selectedImgIndex - 1);
        });
      });

      describe("close-popUp-btn", () => {
        let closePopUpBtn;
        beforeEach(() => {
          props = createTestProps({});
          const { getByText } = mockRender(props);
          closePopUpBtn = getByText(/\u2715/i);
        });

        afterEach(() => {
          handlePhotoChange.mockClear();
        });

        it("onclick on `close-popUp-btn` should trigger `handlePhotoChange` fn", () => {
          fireEvent.click(closePopUpBtn);
          expect(closePopUp.mock.calls.length).toEqual(1);
        });
      });
    });
  });
});
