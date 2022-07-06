import { api } from "./api";

export interface User {
  id: number;
  login: string;
  name: string;
  html_url: string;
  avatar_url: string;
}

export async function authenticate() {
  let user: User = { id: 0, login: "", name: "", html_url: "", avatar_url: "" };

  const url = new URL(location.href);
  const access_token = url.searchParams.get("access_token");

  if (access_token) {
    sessionStorage.setItem("access_token", access_token);
    location.replace("/");
  }

  try {
    const token = sessionStorage.getItem("access_token");
    if (!token) throw new Error("missing access_token");
    user = await api<User>("/user");
  } catch (e) {
    location.replace(`https://getcms.netlify.app/github/login?target=${location.href}`);
  }

  return user;
}
