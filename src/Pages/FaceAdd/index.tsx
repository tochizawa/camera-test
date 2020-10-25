import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import FaceAdd from '../../Components/FaceAdd'
import HeroPart from '../../Components/HeroPart'

interface Props extends RouteComponentProps<{}> {}
interface State {}

class FaceAddPage extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = { facingMode: 'user'};
  }

  handleToAboutPage = () => {
    this.props.history.push('/Entry/PersonSetting')
  }
  handleToHomePage = () => {
    this.props.history.push('/')
  }

  render(){
    return(
      <>
        <HeroPart title={"顔登録"} subtitle={"顔登録を行います。"} />
        <div className="container">
          <div className="columns is-marginless">
            <div className="column is-3" />
            <div className="column is-6">
              <div className="has-text-centered">
                <FaceAdd onHandleScan={this.handleToAboutPage} onHandleExit={this.handleToHomePage}/>
              </div>
            </div>
            <div className="column is-3" />
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(FaceAddPage)