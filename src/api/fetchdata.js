
export async function fetchData(url) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-pro-api-key': 'CG-B9QorLAb6uo6jZaY9c5BbSAP',
    },
  };

  return fetch(url, options)
    .then(res => res.json())
    .catch(err => console.error(err));
}
