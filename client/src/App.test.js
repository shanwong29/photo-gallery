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

    //Check initial state
    it("activeImg in initial State should be the first image", () => {
      const state = component.instance().state;
      expect(state.activeImgIndex).toEqual(0);
    });

    it("popUp should be closed", () => {
      const state = component.instance().state;
      expect(state.isPopUp).toEqual(false);
    });

    it("should render Mosaic component", () => {
      expect(component.find("Mosaic").length).toEqual(1);
      expect(component.find("Carousel").length).toEqual(0);
    });

    it("should render Navbar component", () => {
      expect(component.find("Navbar").length).toEqual(1);
    });
  });

  // you may check the mock axios function in `./service/__mocks__/axios.js` for reference
  describe("callback functions", () => {
    describe("when getPhotoData function is called", () => {
      it("should fetch Photo data from api and update the state correspondingly", () => {
        component.unmount();
        component = shallow(<App />);
        setTimeout(() => {
          try {
            const state = component.instance().state;
            expect(state.photoData).toEqual(mockGetPhotoResponse.results);
          } catch (err) {
            console.log(err);
          }
          done();
        });
      });
    });

    describe("when handlePhotoChange function is called", () => {
      let instance;
      const mockActiveImgIndex = 4;

      beforeEach(() => {
        instance = component.instance();
        instance.handlePhotoChange(mockActiveImgIndex);
      });

      it("should update the activeImgIndex property in state", () => {
        expect(instance.state.activeImgIndex).toEqual(mockActiveImgIndex);
      });
    });

    describe("when mode = carousel & handlePhotoChange function is called", () => {
      it("popUp should remain close", () => {
        const instance = component.instance();
        const mockMode = "carousel";
        const mockActiveImgIndex = 2;

        instance.handleModeChange(mockMode);
        instance.handlePhotoChange(mockActiveImgIndex);

        expect(instance.state.isPopUp).toEqual(false);
      });
    });

    describe("when mode = Mosaic & handlePhotoChange function is called", () => {
      it("popUp should open", () => {
        const instance = component.instance();
        const mockMode = "mosaic";
        const mockActiveImgIndex = 2;

        instance.handleModeChange(mockMode);
        instance.handlePhotoChange(mockActiveImgIndex);

        expect(instance.state.isPopUp).toEqual(true);
      });
    });

    describe("when handleModeChange function is called to change mode to carousel", () => {
      let instance;
      const mockMode = "carousel";

      beforeEach(() => {
        instance = component.instance();
        instance.handleModeChange(mockMode);
      });

      it("should update the mode property in state", () => {
        expect(instance.state.mode).toEqual(mockMode);
      });

      it("should render Carousel component", () => {
        expect(component.find("Carousel").length).toEqual(1);
        expect(component.find("Mosaic").length).toEqual(0);
      });
    });

    describe("when handleModeChange function is called to change mode to mosaic", () => {
      let instance;
      const mockMode = "mosaic";

      beforeEach(() => {
        instance = component.instance();
        instance.handleModeChange(mockMode);
      });

      it("should render Mosaic component", () => {
        expect(component.find("Carousel").length).toEqual(0);
        expect(component.find("Mosaic").length).toEqual(1);
      });
    });
  });
});
