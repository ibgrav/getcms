import { createRoot } from "react-dom/client";
import { App, AppProps } from "./components/App";

export function render(props: AppProps) {
  const app = document.getElementById("app")!;

  const root = createRoot(app);
  root.render(<App {...props} />);
}
