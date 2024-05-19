import { FC } from 'react';
import { useGetRandomCatQuery } from '../services/catsApi';

const CatImage: FC = () => {
  const { data, error, isLoading, isFetching, refetch } =
    useGetRandomCatQuery();

  if (error) return <>Oh no, there was an error</>;

  if (isLoading || isFetching) return <>Loading...</>;

  const randomCat = data?.[0];

  return (
    <div className="card">
      <button onClick={refetch}>Get another</button>
      {randomCat && (
        <img
          src={randomCat.url}
          alt="random cat image"
          width={800}
          height={400}
        />
      )}
    </div>
  );
};

export default CatImage;
