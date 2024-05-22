import SliderContent from '@/components/SliderContent.tsx';
import { useGetCatsQuery } from '@/services/catsApi.ts';
import { FC, useState } from 'react';

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
        <button onClick={() => handlePrev()} className="left-button">
          {'<'}
        </button>
        <div className="slider-content">
          <SliderContent currentIndex={currentIndex} />
        </div>
        <button onClick={() => handleNext()} className="right-button">
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default CatSlider;
