import React, { Component } from 'react';

class ClassTimer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
    this.timer = null; // biến lưu ID của setInterval
  }

  componentDidMount() {
    // Khi component được mount (insert vào DOM), khởi tạo interval đếm giây
    this.timer = setInterval(() => {
      this.setState(prev => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    // Trước khi component bị unmount, dọn dẹp interval để tránh lỗi leak
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h2>Class Timer</h2>
        <p>Giây đã trôi: {this.state.seconds}</p>
      </div>
    );
  }
}

export default ClassTimer;
