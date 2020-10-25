import React, { Component } from 'react';
import ReactWebcam from 'react-webcam';
import Slider from "react-slick";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type imageType = {
  key: string
  src: string
  hasImg: boolean
};

const noImage =  `${process.env.PUBLIC_URL}/no_image.png`
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
interface State {
  images: imageType[]
  exit: boolean
  webcamEnabled: boolean
  showImageKey: string | null
  isShowConfirm: boolean
}

interface Props {
  onHandleScan: () => void
  onHandleExit: () => void
}

export default class FaceAdd extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      images: [{ key: "image_1", src: noImage, hasImg: false}, { key: "image_2", src: noImage, hasImg: false},{ key: "image_3", src: noImage, hasImg: false},{ key: "image_4", src: noImage, hasImg: false},{ key: "image_5", src: noImage, hasImg: false}],
      exit: false,
      webcamEnabled: true,
      showImageKey: null,
      isShowConfirm: false
    };
  }

  componentWillUnmount() {
    this.setState({ webcamEnabled: false })
  }

  capture = () => {
    const imageSrc = (this.refs.webcam as ReactWebcam).getScreenshot();
    const images = this.state.images
    const firstNoImageIndex =  images.findIndex(v => !v.hasImg)
    if (firstNoImageIndex === -1) {
      return
    }
    const chageImage = images[firstNoImageIndex]
    chageImage.hasImg = true
    chageImage.src = imageSrc || ""
    images[firstNoImageIndex] = chageImage
    this.setState({images})
  };

  handleDelete = (key: string) => {
    const images = this.state.images
    images.forEach(v => {
      if(v.key !== key) {
        return
      }
      v.hasImg = false
      v.src = noImage
    })
    this.setState({images});
  }

  handleConfirmShow = () => {
    this.setState({isShowConfirm: !this.state.isShowConfirm})
  }

  handleAddFace = () => {
    this.setState({images: [{ key: "image_1", src: noImage, hasImg: false}, { key: "image_2", src: noImage, hasImg: false},{ key: "image_3", src: noImage, hasImg: false},{ key: "image_4", src: noImage, hasImg: false},{ key: "image_5", src: noImage, hasImg: false}]})
    this.setState({isShowConfirm: false})
    toast("顔登録完了")
  }

  get selectedImage() {
    return this.state.images.find(v => v.key === this.state.showImageKey)?.src || ''
  }

  render() {
    const videoConstraints = {
      facingMode: 'user',
    };
    return (
      <>
        <h4 className="title is-4">xxxxxx様の顔登録</h4>
        <ReactWebcam
          audio={false}
          ref={'webcam'}
          width={1280}
          height={1280}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          onUserMediaError={() => window.alert('cant access your camera')}
          onClick={this.capture}
        />
      <div>
        <Slider {...settings}>
          {this.state.images.map((image) => {
            return <div className="tile is-parent">
            <button className="delete is-pulled-right" style={{"display": image.hasImg ? undefined : "none"}} onClick={() => {this.handleDelete(image.key)}} ></button>
            <article className="tile is-child box">
              <figure className="image is-4by3">
                <img src={image.src} key={image.key} onClick={() => {this.setState({showImageKey: image.key})}} alt="" />
              </figure>
            </article>
          </div>
          })}
        </Slider>
      </div>
      <div>
        <button
          className="button is-medium is-halfwidth is-success"
          onClick={this.handleConfirmShow}
          disabled={!this.state.images.length} >顔登録</button>
      </div>
      <div className={`modal ${(this.state.showImageKey) ? 'is-active' : '' }`}>
        <div className="modal-background"></div>
        <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete" aria-label="close" onClick={() => {this.setState({showImageKey: null})}}></button>
        </header>
          <section className="modal-card-body">
            <p className="image">
              <img src={this.selectedImage} alt=""  /></p>
          </section>
        </div>
      </div>
      <div className={`modal ${(this.state.isShowConfirm) ? 'is-active' : '' }`}>
        <div className="modal-background"></div>
        <div className="modal-content">
        <article className="message is-success is-medium">
          <div className="message-header">
            <p>顔登録を行いますか？</p>
          </div>
          <div className="message-body is-centered">
            <div className="buttons has-text-centered">
              <button className="button is-medium" onClick={this.handleAddFace}>はい</button>
              <button className="button is-medium" onClick={() => {this.setState({isShowConfirm: false})}}>いいえ</button>
            </div>
          </div>
        </article>
        </div>
      </div>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          />
      </>
    );
  }
}
