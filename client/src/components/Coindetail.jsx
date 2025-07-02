import { useEffect, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom';

export function CoinDetail() {
  const { id } = useParams();
  const [CoinDetailArray, setCoinDetailArray] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/coindetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCoinDetailArray(data);
      })
      .catch((e) => console.error(e + 'Error in fetching coindetail'));
  }, [id]);

  return (
    <>
      <div style={{ color: 'white' }}></div>
    </>
  );
}
