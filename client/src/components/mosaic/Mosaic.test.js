import React from "react";
import Mosaic from "./Mosaic";
import { mockGetPhotoResponse } from "../../service/__mocks__/mockGetPhotoResponse";
import { shallow } from "enzyme";

describe("Mosaic", () => {
  // *************************** Below: set up for each test   ****************************
  const mockPhotoData = mockGetPhotoResponse.results;
  const handlePhotoChange = jest.fn();
  const closePopUp = jest.fn();
  const randomActiveIndex = Math.floor(
    Math.random() * Math.floor(mockPhotoData.length)
  );

  const createTestProps = props => {
    return {
      // common props
      photoData: mockPhotoData,
      activeImgIndex: randomActiveIndex,
      err: "",
      handlePhotoChange,
      closePopUp,
      isPopUp: false,
      //overriding existing props
      ...props
    };
  };

  let component;
  let props;

  afterEach(() => {
    component.unmount();
  });

  // ******************************************************************************************

  describe("rendering", () => {
    it("render without crashing", () => {
      props = createTestProps({});
      component = shallow(<Mosaic {...props} />);
      expect(component.find(".mosaic").length).toEqual(1);
    });

    describe("when photo data is empty", () => {
      it("should render empty div without crashing", () => {
        props = createTestProps({ photoData: [] });
        component = shallow(<Mosaic {...props} />);
        expect(component.html()).toBe("");
      });
    });

    describe("when isPopUp is false", () => {
      it("should not render PopUpControlPanel", () => {
        props = createTestProps({ isPopUp: false });
        component = shallow(<Mosaic {...props} />);
        expect(component.find("PopUpControlPanel").length).toEqual(0);
      });
    });

    describe("when isPopUp is true", () => {
      it("should render PopUpControlPanel", () => {
        props = createTestProps({ isPopUp: true });
        component = shallow(<Mosaic {...props} />);
        expect(component.find("PopUpControlPanel").length).toEqual(1);
      });
    });

    describe("when there is err", () => {
      it("should render ErrorMsg Component", () => {
        props = createTestProps({ err: "This is a mock error" });
        component = shallow(<Mosaic {...props} />);

        const errorMsgComponent = component.find("ErrorMsg");
        expect(errorMsgComponent).toHaveLength(1);
      });
    });

    describe("thumbnails", () => {
      beforeEach(() => {
        props = createTestProps({});
        component = shallow(<Mosaic {...props} />);
      });

      it("no of thumbnails should match with the length of the images property of the data given", () => {
        const thumbnails = component.find(".mosaic__items");
        expect(thumbnails).toHaveLength(mockPhotoData.length);
      });

      it("url of each thumbnails should be regular", () => {
        const thumbnails = component.find(".mosaic__items");
        for (let i = 0; i < thumbnails.length; i++) {
          expect(thumbnails.at(i).props()).toHaveProperty("style", {
            backgroundImage: `url(${mockPhotoData[i].urls.regular})`
          });
        }
      });
    });
    describe("when isPop up is true", () => {
      it("thumbnail at position of activeImgIndex should be enlarged", () => {
        let mockActiveImgIndex = 0;
        props = createTestProps({
          isPopUp: true,
          activeImgIndex: mockActiveImgIndex
        });
        component = shallow(<Mosaic {...props} />);

        const selectedThumbnail = component
          .find(".mosaic__items")
          .at(mockActiveImgIndex);

        const controlThumbnail = component
          .find(".mosaic__items")
          .at(mockActiveImgIndex + 1);

        expect(selectedThumbnail.hasClass("enlarged")).toBe(true);
        expect(controlThumbnail.hasClass("enlarged")).toBe(false);
      });
    });

    describe("callback fn", () => {
      beforeEach(() => {
        props = createTestProps({});
        component = shallow(<Mosaic {...props} />);
      });
      describe("when thumbnails is clicked", () => {
        it("should call the `handlePhotoChange` fn and pass its index number as parameter", () => {
          let randomThumbnailIndex = Math.floor(
            Math.random() * Math.floor(mockPhotoData.length)
          );
          const selectedThumbnail = component
            .find(".mosaic__items")
            .at(randomThumbnailIndex);
          selectedThumbnail.simulate("click");

          expect(handlePhotoChange.mock.calls.length).toEqual(1);
          expect(handlePhotoChange).toHaveBeenCalledWith(randomThumbnailIndex);
          handlePhotoChange.mockClear();
        });
      });
    });
  });
});
