import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Carousel from "./components/carousel/Carousel";
import Mosaic from "./components/mosaic/Mosaic";

import getPhotoData from "./service/getPhotoData";

class App extends React.Component {
  state = {
    photoData: [], // can't be null
    activeImgIndex: 0,
    mode: "mosaic",
    isPopUp: false,
    err: ""
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await getPhotoData();

      if (response.err) {
        console.log("fetch data err from backend:", response.err);
        return this.setState({ err: response.err });
      }

      this.setState({ photoData: response.results });
    } catch (err) {
      console.log("fetch data err from front-end:", err);
      this.setState({ err });
    }
  };

  handlePhotoChange = imgIndex => {
    this.setState({
      activeImgIndex: imgIndex
    });
    if (this.state.mode === "mosaic") {
      this.setState({
        isPopUp: true
      });
    }
  };

  handleModeChange = mode => {
    this.setState({ mode });

    // close popUp when unmount mosaic component
    if (this.state.mode === "mosaic") {
      this.setState({
        isPopUp: false
      });
    }
  };

  closePopUp = () => {
    this.setState({ isPopUp: false, activeImgIndex: 0 });
  };

  render() {
    return (
      <div className="App">
        <Navbar
          mode={this.state.mode}
          handleModeChange={this.handleModeChange}
        />

        {this.state.mode === "mosaic" && (
          <Mosaic
            photoData={this.state.photoData}
            activeImgIndex={this.state.activeImgIndex}
            handlePhotoChange={this.handlePhotoChange}
            err={this.state.err}
            isPopUp={this.state.isPopUp}
            closePopUp={this.closePopUp}
          />
        )}
        {this.state.mode === "carousel" && (
          <Carousel
            photoData={this.state.photoData}
            activeImgIndex={this.state.activeImgIndex}
            handlePhotoChange={this.handlePhotoChange}
            err={this.state.err}
          />
        )}
      </div>
    );
  }
}

export default App;
