import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Carousel from "./Carousel";
import { mockGetPhotoResponse } from "../../service/__mocks__/mockGetPhotoResponse";

import { render, fireEvent } from "@testing-library/react";

describe("Carousel Test", () => {
  // *****************************    Below: set up for each test    **********************************

  const mockPhotoData = mockGetPhotoResponse.results;
  const mockHandlePhotoChange = jest.fn();
  const randomImgIndex = Math.floor(Math.random() * mockPhotoData.length);

  const createTestProps = props => {
    return {
      // common props
      photoData: mockPhotoData,
      activeImgIndex: randomImgIndex,
      handlePhotoChange: mockHandlePhotoChange,
      err: "",
      ...props
    };
  };

  let props;
  const mockRender = props => {
    return render(
      <BrowserRouter>
        <Carousel {...props} />
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
          <Carousel {...props} />
        </BrowserRouter>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });

    it("should render error msg when there is an error from data fetching", () => {
      props = createTestProps({ err: "This is a mock error." });
      const { getAllByText } = mockRender(props);
      expect(getAllByText(/something goes wrong/i)).toHaveLength(1);
    });

    describe("control panel", () => {
      it("hide previous-img-button when the first img is active", () => {
        props = createTestProps({ activeImgIndex: 0 });
        const { getByText } = mockRender(props);
        const previousImgBtn = getByText(/\u25C0/i);
        expect(previousImgBtn).toHaveClass("button__hide");
      });

      it("hide next-img-button when the last img is active", () => {
        props = createTestProps({
          activeImgIndex: mockPhotoData.length - 1
        });
        const { getByText } = mockRender(props);
        const nextImgBtn = getByText(/\u25B6/i);
        expect(nextImgBtn).toHaveClass("button__hide");

        // using getByText can imitate better users' exp
        // const { getByTestId } = mockRender(props);
        // expect(getByTestId("next-img-button")).toHaveClass("button__hide");
      });

      it("the indicators (thumbnails) at `activeImgIndex` position should be in active style", () => {
        props = createTestProps({});
        const { getByAltText } = mockRender(props);
        const activeImg = getByAltText(
          `${mockPhotoData[randomImgIndex].alt_description}_thumbnails`
        );
        expect(activeImg.className).toEqual(`panel__thumbnails active`);
      });

      it("url of indicators (thumbnails) should match with urls.small", () => {
        props = createTestProps({});
        const { getAllByRole } = mockRender(props);
        const images = getAllByRole("img", { class: "panel__thumbnails" });

        expect(images[randomImgIndex].src).toEqual(
          mockPhotoData[randomImgIndex].urls.small
        );
      });
    });

    describe("display images in carousel", () => {
      let getByAltText;
      beforeEach(() => {
        props = createTestProps({});
        let component = mockRender(props);
        getByAltText = component.getByAltText;
      });

      it("url of display images should match with urls.regular", () => {
        const altText = mockPhotoData[randomImgIndex].alt_description;
        const activeImg = getByAltText(altText);
        expect(activeImg.src).toEqual(
          mockPhotoData[randomImgIndex].urls.regular
        );
      });

      it("display Img at the position of `activeImgIndex` should have active styling", () => {
        const altText = mockPhotoData[randomImgIndex].alt_description;
        const activeImg = getByAltText(altText);
        expect(activeImg.className).toEqual(`carousel__img active`);
      });
    });
  });

  describe("onclick function", () => {
    let getByText;
    let component;
    beforeEach(() => {
      props = createTestProps({});
      component = mockRender(props);
      getByText = component.getByText;
    });

    afterEach(() => {
      mockHandlePhotoChange.mockClear();
    });

    it("onclick on `previous-img-button` should trigger `handlePhotoChange` fn", () => {
      const previousImgBtn = getByText(/\u25C0/i);

      fireEvent.click(previousImgBtn);
      expect(mockHandlePhotoChange.mock.calls.length).toEqual(1);
      expect(mockHandlePhotoChange).toHaveBeenCalledWith(randomImgIndex - 1);
    });

    it("onclick on `previous-img-button` should trigger `handlePhotoChange` fn", () => {
      const nextImgBtn = getByText(/\u25B6/i);

      fireEvent.click(nextImgBtn);
      expect(mockHandlePhotoChange.mock.calls.length).toEqual(1);
      expect(mockHandlePhotoChange).toHaveBeenCalledWith(randomImgIndex + 1);
    });

    it("onclick on indicators (thumbnails) should trigger `handlePhotoChange` events & pass its index as param", () => {
      const getAllByRole = component.getAllByRole;
      const images = getAllByRole("img", { class: "panel__thumbnails" });
      const selectedIndictor = images[randomImgIndex];

      fireEvent.click(selectedIndictor);
      expect(mockHandlePhotoChange.mock.calls.length).toEqual(1);
      expect(mockHandlePhotoChange).toHaveBeenCalledWith(randomImgIndex);
    });
  });
});
