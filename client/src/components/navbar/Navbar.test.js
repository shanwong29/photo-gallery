import React from "react";
import Navbar from "./Navbar";
import { shallow } from "enzyme";

describe("Navbar", () => {
  /****************************** Below: Set up for each test *********************************** */

  const mockCallBack = jest.fn();
  const createTestProps = props => {
    return {
      // common props
      mode: "mosaic",
      handleModeChange: mockCallBack,

      ...props
    };
  };

  let props;
  let component;

  afterEach(() => {
    component.unmount();
  });

  /******************************************************************************************* */
  describe("rendering", () => {
    beforeEach(() => {
      props = createTestProps({});
      component = shallow(<Navbar {...props} />);
    });
    it("render without crashing", () => {
      expect(component.find(".nav").length).toEqual(1);
    });

    it("should render 2 buttons: Mosaic & Carousel", () => {
      const buttons = component.find("button");
      expect(buttons).toHaveLength(2);
      expect(buttons.at(0).text()).toBe("Mosaic");
      expect(buttons.at(1).text()).toBe("Carousel");
    });
  });

  describe("styling", () => {
    describe("when mode is mosaic", () => {
      it("mosaic btn should be in active style", () => {
        props = createTestProps({ mode: "mosaic" });
        component = shallow(<Navbar {...props} />);

        const mosaicBtn = component.find("button").at(0);
        const carouselBtn = component.find("button").at(1);
        expect(mosaicBtn.hasClass("active")).toBe(true);
        expect(carouselBtn.hasClass("active")).toBe(false);
      });
    });

    describe("when mode is carousel", () => {
      it("carousel btn should be in active style", () => {
        props = createTestProps({ mode: "carousel" });
        component = shallow(<Navbar {...props} />);

        const mosaicBtn = component.find("button").at(0);
        const carouselBtn = component.find("button").at(1);
        expect(mosaicBtn.hasClass("active")).toBe(false);
        expect(carouselBtn.hasClass("active")).toBe(true);
      });
    });
  });

  describe("callback functions", () => {
    beforeEach(() => {
      props = createTestProps({});
      component = shallow(<Navbar {...props} />);
    });
    describe("when Mosaic btn in navbar is clicked", () => {
      it("should call the `handleModeChange` fn and pass `mosaic` as parameter", () => {
        const mosaicBtn = component.find("button").at(0);
        // console.log(component.debug());
        // console.log(mosaicBtn.debug());
        mosaicBtn.simulate("click");

        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(mockCallBack).toHaveBeenCalledWith("mosaic");
        mockCallBack.mockClear();
      });
    });

    describe("when Carousel btn in navbar is clicked", () => {
      it("should call the `handleModeChange` fn and pass `carousel` as parameter", () => {
        const carouselBtn = component.find("button").at(1);
        carouselBtn.simulate("click");

        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(mockCallBack).toHaveBeenCalledWith("carousel");
        mockCallBack.mockClear();
      });
    });
  });
});
