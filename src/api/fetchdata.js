export async function fetchData(url) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  if (!url) {
    console.error('Invalid path:', path);
    return res.status(400).json({ error: 'Invalid API endpoint requested.' });
  }
  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}
