import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Carousel from "./components/carousel/Carousel";
import getPhotoData from "./service/getPhotoData";

class App extends React.Component {
  state = {
    photoData: "",
    activeImgIndex: 0
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
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => (
            <Carousel
              photoData={this.state.photoData}
              activeImgIndex={this.state.activeImgIndex}
              handlePhotoChange={this.handlePhotoChange}
              err={this.state.err}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
