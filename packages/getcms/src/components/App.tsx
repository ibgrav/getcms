import { useState } from "react";
import { User } from "src/authenticate";
import { GetCMSConfig } from "..";

export interface AppProps {
  user: User;
  config: GetCMSConfig;
}

export function App({ user, config }: AppProps) {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Welcome {user.name}!</h1>
      <button style={{ color: "blue" }} onClick={() => setCount((c) => c + 1)}>
        count {count}
      </button>
      <pre>{JSON.stringify({ config, user }, null, 2)}</pre>
    </main>
  );
}
