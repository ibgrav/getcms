import { render } from "./render";
import { authenticate } from "./authenticate";

export interface GetCMSConfig {
  repository_url: string;
}

export function defineGetCMS(config: GetCMSConfig) {
  authenticate().then((user) => {
    if (user.id) {
      render({ user, config });
    }
  });
}

if (import.meta.env.DEV) {
  defineGetCMS({
    repository_url: "https://github.com/ibgrav/getcms",
  });
}
