// import { Octokit } from "octokit";

export async function authenticate() {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) throw new Error("missing access_token");

    // const kit = new Octokit({ auth: token });

    // const { data } = await kit.rest.users.getAuthenticated();
    // console.log({ kit: data });
  } catch (e) {
    console.error(e);
    location.replace(`https://getcms.netlify.app/github/login?target=${location.href}`);
  }
}
