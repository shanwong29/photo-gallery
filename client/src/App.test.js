import React from "react";
import App from "./App";
import { mockGetPhotoResponse } from "./service/__mocks__/mockGetPhotoResponse";
import { shallow } from "enzyme";

describe("App test", () => {
  /****************************** Below: Set up for each test *********************************** */
  let component;
  beforeEach(() => {
    component = shallow(<App />);
  });
  afterEach(() => {
    component.unmount();
  });
  /******************************************************************************************* */

  describe("rendering", () => {
    it("render App without crashing", () => {
      expect(component.find(".App").length).toEqual(1);
    });

    it("activeImg in initial State should be the first image", () => {
      const state = component.instance().state;
      expect(state.activeImgIndex).toEqual(0);
    });

    it("should render Mosaic component", () => {
      expect(component.find("Mosaic").length).toEqual(1);
      expect(component.find("Carousel").length).toEqual(0);
    });
  });

  // you may check the mock axios function in `./service/__mocks__/axios.js` for reference
  describe("callback functions", () => {
    describe("when getPhotoData function is called", () => {
      it("should fetch Photo data from api and update the state correspondingly", done => {
        setTimeout(() => {
          const state = component.instance().state;
          expect(state.photoData).toEqual(mockGetPhotoResponse.results);
          done();
        });
      });
    });

    describe("when handlePhotoChange function is called", () => {
      let instance;
      let mockActiveImgIndex = 4;

      beforeEach(() => {
        instance = component.instance();
        instance.handlePhotoChange(mockActiveImgIndex);
      });

      it("should update the activeImgIndex property in state", () => {
        expect(instance.state.activeImgIndex).toEqual(mockActiveImgIndex);
      });

      describe("when current commponent shown is Mosaic", () => {
        it("should open the active img in popUp", () => {
          expect(instance.state.isPopUp).toEqual(true);
        });
      });
    });

    describe("when Mosaic btn in navbar is clicked", () => {
      it("should show Mosaic Component and hide Carousel component", () => {
        const mosaicBtn = component.find("button").at(0);
        mosaicBtn.simulate("click");
        expect(component.find("Mosaic").length).toEqual(1);
        expect(component.find("Carousel").length).toEqual(0);
      });
    });

    describe("when Carousel btn in navbar is clicked", () => {
      it("should show Carousel Component and hide Mosaic component", () => {
        const carouselBtn = component.find("button").at(1);
        carouselBtn.simulate("click");
        expect(component.find("Mosaic").length).toEqual(0);
        expect(component.find("Carousel").length).toEqual(1);
      });
    });
  });
});
