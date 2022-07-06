import { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import fetch from "node-fetch";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";

const createRedirectUri = (target: string) =>
  `https://getcms.netlify.app/github/callback?target=${encodeURIComponent(target)}`;

const loginHandler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const target = event.queryStringParameters?.target || "/";
  const url = new URL("https://github.com/login/oauth/authorize");

  const redirect_uri = createRedirectUri(target);

  url.searchParams.set("scope", "user:email");
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("redirect_uri", redirect_uri);

  return {
    statusCode: 307,
    headers: {
      Location: url.href,
    },
  };
};

interface OathResponse {
  access_token?: string;
  error?: string;
  error_uri?: string;
  error_description?: string;
}

const callbackHandler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const code = event.queryStringParameters?.code;
  const target = event.queryStringParameters?.target;

  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "post",
      body: JSON.stringify({ code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = (await res.json()) as OathResponse;

    if (data.error) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 307,
      headers: {
        Location: `${target}?access_token=${data.access_token}`,
      },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: (e as Error).stack,
    };
  }
};

export const handler: Handler = async (event) => {
  if (event.path.startsWith("/github/login")) {
    return loginHandler(event);
  }

  if (event.path.startsWith("/github/callback")) {
    return callbackHandler(event);
  }

  return {
    statusCode: 200,
    body: "ok",
  };
};
