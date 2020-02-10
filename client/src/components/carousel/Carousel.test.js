import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Carousel from "./Carousel";

import { render, fireEvent } from "@testing-library/react";
// import { getByAltText } from "@testing-library/dom";

describe("Carousel Test", () => {
  // *****************************    Below: set up for each test    **********************************

  const mockPhotoData = [
    {
      id: "1",
      alt_description: "aerial photography of city buildings",
      urls: {
        raw: "https://abc/kjfds",
        full: "https://fkjs/jsf//dsljf",
        regular: "https://images.regular-tedt.jpg",
        small: "https://images.small.jpg",
        thumb: "https://images=entropy&cWQiOjExNDE3N30"
      }
    },
    {
      id: "2",
      alt_description: "salt lake",
      urls: {
        raw: "https://gfsjffds",
        full: "https://fJUHFd78f",
        regular: "https://imasfkj87t.jpg",
        small: "https://imagessfhdsl.jpg",
        thumb: "https://image43093284ExNDE3N30"
      }
    }
  ];

  const mockCallBack = jest.fn();
  const createTestProps = props => {
    return {
      // common props
      photoData: mockPhotoData,
      activeImgIndex: 1,
      handlePhotoChange: mockCallBack,
      err: null,
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

    it("hide previous-img-button when it is the first img", () => {
      props = createTestProps({ activeImgIndex: 0 });
      const { getByTestId } = mockRender(props);

      expect(getByTestId("previous-img-button")).toHaveClass("button__hide");
    });

    it("hide next-img-button when it is the last img", () => {
      props = createTestProps({
        activeImgIndex: mockPhotoData.length - 1
      });
      const { getByTestId } = mockRender(props);

      expect(getByTestId("next-img-button")).toHaveClass("button__hide");
    });

    it("url of display image should be big image and match with the url building logic", () => {
      const randomImgIndex = Math.floor(
        Math.random() * Math.floor(mockPhotoData.length)
      );
      props = createTestProps({
        activeImgIndex: randomImgIndex
      });

      const { getByAltText } = mockRender(props);
      const activeImg = getByAltText(
        mockPhotoData[randomImgIndex].alt_description
      );
      expect(activeImg.className).toEqual(`carousel__img active`);
    });
  });

  describe("onclick function", () => {
    let getByTestId;
    let component;
    beforeEach(() => {
      props = createTestProps({});
      component = mockRender(props);
      getByTestId = component.getByTestId;
    });

    afterEach(() => {
      mockCallBack.mockClear();
    });

    it("previous-img-button click should fire handlePhotoChange events", () => {
      const previousImgBtn = getByTestId("previous-img-button");

      fireEvent.click(previousImgBtn);
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it("previous-img-button click should fire handlePhotoChange events", () => {
      const nextImgBtn = getByTestId("next-img-button");

      fireEvent.click(nextImgBtn);
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
  });
});
