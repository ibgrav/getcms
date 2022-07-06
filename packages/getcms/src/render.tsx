import { createRoot } from "react-dom/client";
import { App } from "./components/App";

export function render() {
  const app = document.getElementById("app")!;

  const root = createRoot(app);
  root.render(<App />);
}
