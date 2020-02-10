import React from "react";
import Mosaic from "./Mosaic";
import { shallow } from "enzyme";

describe("Mosaic", () => {
  // *************************** Below: set up for each test   ****************************
  const mockPhotoData = [
    {
      id: "1",
      alt_description: "city buildings",
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
      activeImgIndex: Math.floor(
        Math.random() * Math.floor(mockPhotoData.length)
      ),
      err: null,
      handlePhotoChange: mockCallBack,
      closePopUp: mockCallBack,
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
    });
  });

  // describe("callbacks", () => {
  //   describe("when each thumbnail is clicked", () => {
  //     beforeEach(() => {
  //       component = shallow(<Mosaic {...props} />);
  //     });
  //     it("should update the activeImgIndex", () => {
  //       const thumbnails = component.find(".mosaic__items");

  //       }
  //     });
  //   });
  // });
});
