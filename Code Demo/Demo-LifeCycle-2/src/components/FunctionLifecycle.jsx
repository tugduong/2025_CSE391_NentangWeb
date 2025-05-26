// Functional Clock Component
function ClockFunction() {
  const [seconds, setSeconds] = useState(0);
  const [color, setColor] = useState('blue');
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // Mount log and unmount cleanup
  useEffect(() => {
    console.log('useEffect (mount) → color = blue');
    return () => {
      console.log('useEffect cleanup (unmount) → color = red');
      clearInterval(timerRef.current);
    };
  }, []);

  // Handle timer based on paused state
  useEffect(() => {
    if (!paused) {
      console.log(`useEffect → resumed, color = ${color}`);
      timerRef.current = setInterval(() => {
        setSeconds(prev => {
          const next = prev + 1;
          console.log(`tick → seconds: ${next}`);
          return next;
        });
      }, 1000);
    } else {
      console.log(`useEffect → paused, color = ${color}`);
    }
    return () => clearInterval(timerRef.current);
  }, [paused, color]);

  // Toggle pause: bấm Pause thì đổi màu, bấm Resume thì giữ nguyên
  const togglePause = () => {
    setPaused(prevPaused => {
      const nextPaused = !prevPaused;

      if (nextPaused) {
        // Khi vừa bấm Pause: luân phiên màu vàng ↔ xanh
        setColor(prevColor => (prevColor === 'yellow' ? 'green' : 'yellow'));
      }

      return nextPaused;
    });
  };

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
      <button onClick={togglePause} className="pause-button">
        {paused ? 'Tiếp tục' : 'Tạm dừng'}
      </button>
    </div>
  );
}
