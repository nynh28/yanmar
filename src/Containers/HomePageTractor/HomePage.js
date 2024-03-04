import React, { Component } from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import images from "./Image/Images";
import i18n from "../../i18n";

let imageSource = [
  {
    src: images.slide1,
    link: "",
  },
];

class HomePage extends Component {
  componentDidMount() {
    i18n.changeLanguage(this.props.language);
  }

  render() {
    return (
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        {imageSource.map((item, index) => {
          return item.link !== "" ? (
            <a key={"div_" + index} href={item.link} target="_blank">
              <div>
                <img
                  key={"img_" + index}
                  src={item.src}
                  style={{
                    height: "auto",
                    width: "auto",
                    maxHeight: "calc(100vh - 111px)",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </a>
          ) : (
            <div>
              <img
                key={"img_" + index}
                src={item.src}
                style={{
                  height: "auto",
                  width: "auto",
                  maxHeight: "calc(100vh - 111px)",
                  maxWidth: "100%",
                }}
              />
            </div>
          );
        })}
      </Carousel>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  configtest: state.signin.configtest,
});

export default connect(mapStateToProps)(HomePage);
