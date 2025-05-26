import React from 'react';
import '../App.css'; 

class ClockLifecycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      color: 'blue',
      paused: false
    };
    console.log('constructor → Khởi tạo state');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps → Nhận props mới');
    // Không thay đổi state dựa trên props trong ví dụ này
    return null;
  }

  componentDidMount() {
    console.log('Component đã được mount');
    this.startTimer();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Kiểm tra xem có nên render lại không');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Trước khi cập nhật DOM');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate → Component đã cập nhật');
    if (prevState.paused !== this.state.paused) {
      console.log(`Trạng thái paused thay đổi: ${this.state.paused}`);
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount → Component sẽ bị unmount');
    clearInterval(this.timerID);
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch → Bắt lỗi trong component con');
    console.error(error, info);
  }

  startTimer = () => {
    this.timerID = setInterval(() => {
      this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timerID);
  };

  togglePause = () => {
    this.setState(prevState => {
      const isPaused = !prevState.paused;
      return {
        paused: isPaused,
        color: isPaused ? 'yellow' : 'green'
      };
    }, () => {
      if (this.state.paused) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
    });
  };

  render() {
    const { seconds, color, paused } = this.state;
    const angle = seconds * 6;

    return (
      <div className="clock">
        <div
          className="hand"
          style={{
            transform: `rotate(${angle}deg)`,
            backgroundColor: color
          }}
        />
        <div className="counter">
          Đã trôi: {seconds} giây
        </div>
        <button onClick={this.togglePause} className="pause-button">
          {paused ? 'Tiếp tục' : 'Tạm dừng'}
        </button>
      </div>
    );
  }
}

export default ClockLifecycle;
