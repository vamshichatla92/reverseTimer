import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentDidMount() {
    this.clearIntervalId()
  }

  clearIntervalId = () => clearInterval(this.intervalId)

  incrementForSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerLimitInMinutes === timeElapsedInSeconds * 60

    if (isTimerCompleted) {
      this.clearIntervalId()
      this.setState({
        isTimerRunning: false,
        timerLimitInMinutes: 25,
      })
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrement = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  renderTimerControlPart = () => {
    const {isTimerRunning} = this.state

    const buttonText = isTimerRunning ? 'Pause' : 'Start'
    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const imgUrlAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="buttons-part">
        <button
          className="button-start"
          type="button"
          onClick={this.onTogglePlayPause}
        >
          <img src={imgUrl} className="start-img" alt={imgUrlAltText} />
          {buttonText}
        </button>

        <button className="button-reset" type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="start-img"
            onClick={this.onResetTimer}
          />
          Reset
        </button>
      </div>
    )
  }

  onTogglePlayPause = () => {
    const {
      timeElapsedInSeconds,
      isTimerRunning,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timerLimitInMinutes === timeElapsedInSeconds * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearIntervalId()
    } else {
      this.intervalId = setInterval(this.incrementForSeconds, 1000)
    }

    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onResetTimer = () => {
    this.clearIntervalId()

    this.setState(initialState)
  }

  renderTimerLimitsPart = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state

    const disableButton = timeElapsedInSeconds > 0

    return (
      <div className="set-timer-part">
        <p>Set Timer Limit</p>
        <div className="c-part">
          <button
            className="minus-button"
            type="button"
            onClick={this.onDecrement}
            disabled={disableButton}
          >
            -
          </button>
          <div className="timer-text-cont">
            <p>{timerLimitInMinutes}</p>
          </div>
          <button
            className="minus-button"
            type="button"
            disabled={disableButton}
            onClick={this.onIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getElapsedSecondsFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timerRunningPauseText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="adj">
          <div className="a-part">
            <div className="timer-num-cont">
              <h1 className="runnning-timer">
                {this.getElapsedSecondsFormat()}
                <p>{timerRunningPauseText}</p>
              </h1>
            </div>
          </div>
          <div className="b-part">
            {this.renderTimerControlPart()}
            {this.renderTimerLimitsPart()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
