import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import QRreader from '../../Components/QRreader'
import HeroPart from '../../Components/HeroPart'

interface Props extends RouteComponentProps<{}> {
  name: string,
}
interface State {
  isActiveModal: boolean,
  qrData: any
}

class Location extends React.Component<Props, State> {

  handleToAboutPage = () => {
    this.props.history.push('/FaceCheck')
  }

  constructor(props: any) {
    super(props);
    this.state = {
      isActiveModal: false,
      qrData: ''
    };
  }

  onHandleScan = (data: any) => {
    if (data) {
      this.setState({ isActiveModal: true })
      this.setState({ qrData: data })
    }
  }

  render() {
    return (
      <>
        <HeroPart title={"現場情報取得"} subtitle={"QRコードをかざしてください。"} />
        <div className="container">
          <div className="columns is-marginless">
            <div className="column is-3" />
            <div className="column is-6">
              <div className="has-text-centered">
                <QRreader onHandleScan={this.onHandleScan} />
              </div>
            </div>
            <div className="column is-3" />
          </div>
        </div>
          <div className={`modal ${this.state.isActiveModal ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">現場情報</p>
              </header>
              <section className="modal-card-body">
                <div className="content">
                  <p>xxxxx現場
                  </p>
                  <ul>
                    <li>情報１</li>
                    <li>情報２</li>
                  </ul>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button className="button is-success" onClick={() => this.handleToAboutPage()}>顔認証へ</button>
                <button className="button" onClick={() => { this.setState({ isActiveModal: false }) }}>再読み込み</button>
              </footer>
            </div>
          </div>
      </>
    )
  }
}
export default withRouter(Location)