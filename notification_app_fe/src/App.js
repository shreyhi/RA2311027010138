import { useEffect } from "react";
import { Log } from "../../logging_middleware/logger";

function App() {

  useEffect(() => {
    Log("frontend", "info", "page", "App loaded");
  }, []);

  const handleClick = () => {
    Log("frontend", "info", "component", "Button clicked");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notification App</h2>

      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}

export default App;