import { FC, useState } from 'react';
import { useGetCatsQuery } from '../services/catsApi';
import CatImage from './CatImage.tsx';

const CatSlider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data, refetch } = useGetCatsQuery(10);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (data?.length ?? 1) - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === (data?.length ?? 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="card">
      <button onClick={() => refetch()}>Get new images</button>
      <div className="slider-wrapper">
        <button onClick={() => handlePrev()}>{'<'}</button>
        {data && data?.length > 0
          ? data.map((cat, index) => (
              <div
                key={cat.id}
                style={{ display: index === currentIndex ? 'block' : 'none' }}
              >
                <CatImage imageIndex={index} />
              </div>
            ))
          : 'No images'}
        <button onClick={() => handleNext()}>{'>'}</button>
      </div>
    </div>
  );
};

export default CatSlider;
