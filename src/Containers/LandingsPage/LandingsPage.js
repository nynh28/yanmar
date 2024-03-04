import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'


import { Slide } from 'react-slideshow-image';


import images from './Image/Images'

const slideImages = [
  images.images1,
  images.images1,
  images.images1
];


const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}




class LandingsPage extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }


  }


  componentDidUpdate(prevProps, prevState) {

  }

  // ---------------------------------------- show data edit ----------------------------------------
  componentDidMount() {

  }






  render() {
    return (
      <div className="contrainner" style={{ height: '100%', minHeight: "calc(100vh - 211px)" }}>

        <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <img src={images.images1} style={{ height: 'calc(100vh - 251px)', minHeight: "350px", width: '100%' }} />
            </div>
            <div className="each-slide">
              <div >
                <img src={images.images1} style={{ height: 'calc(100vh - 251px)', minHeight: "350px", width: '100%' }} />
              </div>
            </div>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[1]})`, backgroundSize: '100% 100%', backgroundPosition: 'right' }}>
                <div style={{ height: 'calc(100vh - 251px)', minHeight: "350px" }} ></div>
              </div>
            </div>
          </Slide>
        </div>








        {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style={{ height: 'calc(100vh - 181px)', minHeight: "350px" }}>
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={images.images1} class="d-block w-100" alt="..." style={{ height: 'calc(100vh - 181px)', minHeight: "350px" }} />
            </div>
            <div class="carousel-item">
              <img src={images.images1} class="d-block w-100" alt="..." style={{ height: 'calc(100vh - 181px)', minHeight: "350px" }} />
            </div>
            <div class="carousel-item">
              <img src={images.images1} class="d-block w-100" alt="..." style={{ height: 'calc(100vh - 181px)', minHeight: "350px" }} />
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div> */}

        {/* <RBCarousel
          animation={true}
          autoplay={this.state.autoplay}
          slideshowSpeed={2000}
          defaultActiveIndex={0}
          leftIcon={this.state.leftIcon}
          rightIcon={this.state.rightIcon}
          onSelect={this._onSelect}
          ref={r => (this.slider = r)}
          version={4}
        >
          <div style={{ height: 400 }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://www.w3schools.com/bootstrap/ny.jpg"
            />
            <div className="carousel-caption">Image</div>
          </div>
          <div style={{ ...styles, backgroundColor: "aqua" }}>
            <video
              className="carousel-center"
              controls
              style={{ width: "75%" }}
              height="250"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
            </video>
            <div className="carousel-caption">Video</div>
          </div>
          <div style={{ ...styles, backgroundColor: "lightpink" }}>
            <div className="carousel-center">center Text</div>
            <div className="carousel-caption">Text</div>
          </div>
          <div style={{ ...styles, backgroundColor: "lightblue" }}>
            <span>text</span>
            <div className="carousel-caption">Text</div>
          </div>
          <div style={{ ...styles, backgroundColor: "lightblue" }}>
            <div className="carousel-center">
              <iframe
                style={{ width: 500 }}
                height="250"
                src="https://www.youtube.com/embed/MhkGQAoc7bc?showinfo=0"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <div className="carousel-caption">Youtube</div>
          </div>
        </RBCarousel> */}

      </div>
    )
  }
}


const mapStateToProps = (state) => ({

  // data: state.login.data
});

const mapDispatchToProps = (dispatch) => ({

  // setTest: test => dispatch(PopupActions.setTest(test))
});


export default connect(mapStateToProps, mapDispatchToProps)(LandingsPage)
