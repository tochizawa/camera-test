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

const occupations = [
  {key: "o1" , value: "職種職種1"}, 
  {key: "o2" , value: "職種職種2"},
  {key: "o3" , value: "職種職種3"},
  {key: "o4" , value: "職種職種4"},
  {key: "o5" , value: "職種職種5"},
  {key: "o6" , value: "職種職種6"},
  {key: "o7" , value: "職種職種7"},
  {key: "o8" , value: "職種職種8"},
  {key: "o9" , value: "職種職種9"},
  {key: "o10" , value: "職種職種10"}
];

const positions = [
  {key: "p1" , value: "立場1"}, 
  {key: "p2" , value: "立場2"},
  {key: "p3" , value: "立場3"},
  {key: "p4" , value: "立場4"},
  {key: "p5" , value: "立場5"},
  {key: "p6" , value: "立場6"},
  {key: "p7" , value: "立場7"},
  {key: "p8" , value: "立場8"},
  {key: "p9" , value: "立場9"},
  {key: "p10" , value: "立場10"}
];


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
        const nextButton = document.querySelectorAll('[data-nav="next"]');
        if(!prevButton || !nextButton) {
          return
        }
        try {
          this.setState({stepCount: step})
          switch (step) {
            case 0:
            case 3:
              // 初回ページと確認ページ
              break
            case 1:
              // 職種ページ
              if(this.state.selectedOccupation == null) {
                nextButton[0].setAttribute('disabled', 'disabled');
              }
              break
            case 2:
              // 立場ページ
              if(this.state.selectedPosition == null) {
                nextButton[0].setAttribute('disabled', 'disabled');
              }
              break
            case 4:
              // 完了ページ
              prevButton[0].setAttribute('disabled', 'disabled');
              this.setState({isFinished: true})
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
  
  get selectedOccupationView(): string {
    const select = occupations.find(v => v.key === this.state.selectedOccupation)
    return select?.value || "未選択"
  }

  get selectedPositionView(): string {
    const select = positions.find(v => v.key === this.state.selectedPosition)
    return select?.value || "未選択"
  }

  get entryTime(): string {
    return dayjs().format('YYYY/MM/DD hh:mm:ss')
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
    return (
      <>
      <div className="steps-action">
      {this.state.stepCount === 0 &&
        <Link data-nav="previous" className="button is-light" to="/FaceCheck"><span>顔認証へ</span></Link>
      }
        <a href="!#" data-nav="previous" className="button is-light" style={{"display": this.state.stepCount === 0 ? "none": undefined}} >Previous</a>
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
                    <p className="step-title">職種選択</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-marker">3</div>
                  <div className="step-details">
                    <p className="step-title">立場選択</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-marker">4</div>
                  <div className="step-details">
                    <p className="step-title">内容確認</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-marker">5</div>
                  <div className="step-details">
                    <p className="step-title">入場完了</p>
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
                      <h4 className="title is-4">職種を選んでください</h4>
                      <div className="buttons">
                        {occupations.map(occupation => {
                          return <button 
                                  className={`button mx-3 my-3 ${this.state.selectedOccupation === occupation.key ? "is-success" : ""}`}
                                  key={occupation.key}
                                  onClick={() => this.handleSelectOccupation(occupation.key)}
                                >{occupation.value}</button>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="step-content has-text-centered">
                    <div className="container">
                      <h4 className="title is-4">立場を選んでください</h4>
                      <div className="buttons">
                      {positions.map(position => {
                          return <button 
                                  className={`button mx-3 my-3 ${this.state.selectedPosition === position.key ? "is-success" : ""}`}
                                  key={position.key}
                                  onClick={() => this.handleSelectPosition(position.key)}
                                >{position.value}</button>
                        })}
                      </div>
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
                          <tr><th>職種</th><td>{this.selectedOccupationView}</td></tr>
                          <tr><th>立場</th><td>{this.selectedPositionView}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="step-content has-text-centered">
                    <div className="container">
                      <h4 className="title is-4">{this.entryTime}<br />xxxx 様の入場が完了いたしました</h4>
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