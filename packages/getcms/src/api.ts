export async function api<T>(path: string) {
  const token = sessionStorage.getItem("access_token");

  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await res.json()) as T;
}
