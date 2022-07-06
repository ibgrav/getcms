import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <button style={{ color: "red" }} onClick={() => setCount((c) => c + 1)}>
      hello world! {count}
    </button>
  );
}
