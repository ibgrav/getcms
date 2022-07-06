import { Handler } from "@netlify/functions";

export const handler: Handler = async (netlifyEvent) => {
  return {
    statusCode: 200,
    body: "ok",
  };
};
