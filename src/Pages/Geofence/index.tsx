import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Geofence from '../../Components/Geofence'

interface Props extends RouteComponentProps<{}> {
  name: string,
}
interface State {
}

class GeofencePage extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = { facingMode: 'user'};
  }

  handleToAboutPage = () => {
    this.props.history.push('/FaceCheck')
  }


  render(){
    return(
      <>
        <div className="container">
          <div className="block">
            <h1 className="title">GPS</h1>
            <h2 className="subtitle">GPSを取得します。</h2>
          </div>
        </div>
        <Geofence onHandleScan={ this.handleToAboutPage } />
      </>
    )
  }
}

export default withRouter(GeofencePage)