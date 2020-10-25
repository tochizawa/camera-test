import React, { Component } from 'react';
import ReactWebcam from 'react-webcam';
import Slider from "react-slick";

type imageType = {
  defaulu: boolean
  src: string
};

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
};
interface State {
  image: imageType
  exit: boolean
  webcamEnabled: boolean
  showSnapshot: boolean
  showConfirm: boolean
}

interface Props {
  onHandleScan: () => void
  onHandleExit: () => void
}

export default class FaceCheck extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      image: {defaulu: true, src: `${process.env.PUBLIC_URL}/no_image.png`},
      exit: false,
      webcamEnabled: true,
      showSnapshot: false,
      showConfirm: false
    };
  }

  componentWillUnmount() {
    this.setState({ webcamEnabled: false })
  }

  capture = () => {
    const imageSrc = (this.refs.webcam as ReactWebcam).getScreenshot();
    if (imageSrc) {
      const image = this.state.image
      image.defaulu = false
      image.src = imageSrc
      this.setState({image})
    }
  };

  handleEntry = () => {
    this.props.onHandleScan()
  }
  handleLeave = () => {
    this.props.onHandleExit()
  }

  imageRest = () => {
    this.setState({image: {defaulu: true, src: `${process.env.PUBLIC_URL}/no_image.png`}})
  }

  ImageCarouselRender = () => {
    return (
    <>
      <div>
        <Slider {...settings}>
          <div className="tile is-parent">
            <button className="delete is-pulled-right" style={{"display": this.state.image.defaulu ? "none": undefined}} onClick={this.imageRest}></button>
            <article className="tile is-child box">
              <figure className="image is-4by3">
                <img src={this.state.image.src} key={"face_image"} alt="" onClick={() => {this.setState({showSnapshot: true})}} />
              </figure>
            </article>
          </div>
        </Slider>
      </div>
      <div>
        <button className="button is-medium is-halfwidth is-success mx-4" disabled={this.state.image.defaulu} onClick={() => { this.handleEntry() }}>入場</button>
        <button className="button is-medium is-halfwidth is-success mx-4" disabled={this.state.image.defaulu} onClick={() => { this.handleLeave() }}>退場</button>
      </div>
    </>
    )
  }
  render() {
    return (
      <>
        <ReactWebcam
          audio={false}
          ref={'webcam'}
          height={'100%'}
          width={'100%'}
          screenshotFormat="image/png"
          videoConstraints={{ facingMode: 'user'}}
          onUserMediaError={() => window.alert('cant access your camera')}
          onClick={this.capture}
        />
        <this.ImageCarouselRender />
        <div className={`modal ${this.state.showSnapshot ? 'is-active' : '' }`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <button className="delete" aria-label="close" onClick={() => {this.setState({showSnapshot: false})}}></button>
            </header>
            <section className="modal-card-body">
              <p className="image"><img src={this.state.image.src} alt=""  /></p>
            </section>
          </div>
        </div>
      </>
    );
  }
}
