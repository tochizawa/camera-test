import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import FaceCheck from '../../Components/FaceCheck'
import HeroPart from '../../Components/HeroPart'

interface Props extends RouteComponentProps<{}> {}
interface State {}

class FaceCheckPage extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = { facingMode: 'user'};
  }

  handleToAboutPage = () => {
    this.props.history.push('/Entry/PersonSetting')
  }
  handleToHomePage = () => {
    this.props.history.push('/Leave/PersonSetting')
  }

  render(){
    return(
      <>
        <HeroPart title={"顔認証"} subtitle={"顔認証を行います。"} />
        <div className="container">
          <div className="columns is-marginless">
            <div className="column is-3" />
            <div className="column is-6">
              <div className="has-text-centered">
                <FaceCheck onHandleScan={this.handleToAboutPage} onHandleExit={this.handleToHomePage}/>
              </div>
            </div>
            <div className="column is-3" />
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(FaceCheckPage)