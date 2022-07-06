import { render } from "./render";
import { authenticate } from "./authenticate";

const url = new URL(location.href);
const access_token = url.searchParams.get("access_token");

if (access_token) {
  localStorage.setItem("access_token", access_token);
  location.replace("/");
}

authenticate().then(() => {
  render();
});
