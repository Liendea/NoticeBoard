import "../styles/legends.css";

export default function Legend() {
  return (
    <div className="container">
      <h5>Priorities:</h5>
      <div className="legends">
        <div className="legend low">Low</div>
        <div className="legend medium">Medium</div>
        <div className="legend high">High</div>
        <div className="legend done">Done</div>
      </div>
    </div>
  );
}
