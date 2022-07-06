import { createRoot } from "react-dom/client";
import { App, AppProps } from "./components/App";

export function render(props: AppProps) {
  let app = document.getElementById("getcms");

  if (!app) {
    app = document.createElement("div");
    app.id = "getcms";
    document.body.prepend(app);
  }

  const root = createRoot(app);
  root.render(<App {...props} />);
}
