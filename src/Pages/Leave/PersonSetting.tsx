import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import HeroPart from '../../Components/HeroPart'
const bulmaSteps = require('../../../node_modules/bulma-steps/dist/js/bulma-steps.min.js')

interface Props {}
interface State {
  stepCount: number,
  isFinished: boolean,
  selectedOccupation: string | null,
  selectedPosition: string | null
}

export default class PersonSetting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      stepCount: 1,
      isFinished: false,
      selectedOccupation: null, // 職種
      selectedPosition: null, // 立場
    }
  }
  componentDidMount() {
    bulmaSteps.attach(".steps",
    {
      beforeNext: (step: number) => {},
      onShow: (step: number) => {
        // 仕様上queryselectorでの取得
        const prevButton = document.querySelectorAll('[data-nav="previous"]');
        if(!prevButton) {
          return
        }
        try {
          this.setState({stepCount: step})
          switch (step) {
            case 0:
              break
            case 1:
            case 2:
              // 完了ページ
              prevButton[0].setAttribute('disabled', 'disabled');
              this.setState({isFinished: step === 2})
              break
            default:
              return
          }
        } catch {
          return
        }
      },
      onFinish: () => {}
    })
  }

  handleSelectOccupation = (selectedOccupation: string) => {
    this.setState({selectedOccupation: selectedOccupation});
    const nextButton = document.querySelectorAll('[data-nav="next"]');
    nextButton[0].removeAttribute('disabled');
  }

  handleSelectPosition = (selectedPosition: string) => {
    this.setState({selectedPosition:  selectedPosition});
    const nextButton = document.querySelectorAll('[data-nav="next"]');
    nextButton[0].removeAttribute('disabled');
  }

  handleStep = (isNext: boolean) => {
    this.setState({stepCount: isNext ? (this.state.stepCount+1) : (this.state.stepCount-1)})
  }

  get entryTime(): string {
    return dayjs().format('YYYY/MM/DD HH:mm:ss')
  }

  StepsRender = () => {
    if(this.state.isFinished) {
      return(
        <>
          <div className="steps-action">
            <Link className="button is-light" to="/Location"><span>現場へ</span></Link>
          </div>
          <div className="steps-action">
            <Link className="button is-light" to="/FaceCheck"><span>顔認証へ</span></Link>
          </div>
        </>
      )
    }
    const isDisplay = this.state.stepCount === 0 ? "none": undefined
    return (
      <>
      <div className="steps-action">
      {isDisplay &&
        <Link data-nav="previous" className="button is-light" to="/FaceCheck"><span>顔認証へ</span></Link>
      }
        <a href="!#" data-nav="previous" className="button is-light" style={{"display": isDisplay}}>Previous</a>
      </div>
      <div className="steps-action">
        <a href="!#" data-nav="next" className="button is-light">Next</a>
      </div>
      </>
    );
    
  }

  render(){
    return(
      <>
        <HeroPart title={"入場登録"} subtitle={"入場登録を行います。"} />
        <div className="container">
          <div className="columns is-marginless">
            <div className="column is-2" />
            <div className="column is-8">
              <div className="steps" id="stepsDemo">
              <div className="step-item is-active">
                  <div className="step-marker">1</div>
                  <div className="step-details">
                    <p className="step-title">認証確認</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-marker">2</div>
                  <div className="step-details">
                    <p className="step-title">退場確認</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-marker">3</div>
                  <div className="step-details">
                    <p className="step-title">退場完了</p>
                  </div>
                </div>
                <div className="steps-content">
                  <div className="step-content has-text-centered is-active">
                    <div className="container">
                      <h4 className="title is-4">あなたはxxx様で間違いないでしょうか？</h4>
                    </div>
                  </div>
                  <div className="step-content has-text-centered">
                    <div className="container">
                      <h4 className="title is-4">入力内容が正しいかご確認ください</h4>
                      <table className="table is-fullwidth">
                        <thead>
                          <tr>
                            <th></th>
                            <th>ユーザ情報</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><th>名前</th><td>xxxxxxxx</td></tr>
                          <tr><th>職種</th><td>xxxxxxxx</td></tr>
                          <tr><th>立場</th><td>xxxxxxxx</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="step-content has-text-centered">
                    <div className="container">
                      <h4 className="title is-4">{this.entryTime}<br />xxxx 様の退場が完了いたしました</h4>
                    </div>
                  </div>
                </div>
                <div className="steps-actions">
                  <this.StepsRender />
                </div>
              </div>
            </div>
            <div className="column is-2" />
          </div>
        </div>
      </>
    )
  }
}