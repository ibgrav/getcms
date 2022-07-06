import { render } from "./render";
import { authenticate } from "./authenticate";

authenticate().then(() => {
  render();
});
