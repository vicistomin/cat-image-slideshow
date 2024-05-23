import SliderContent from '@/components/SliderContent.tsx';
import SliderDots from '@/components/SliderDots.tsx';
import { useGetCatsQuery } from '@/services/catsApi.ts';
import { EmptyHandler } from '@/types';
import { FC, useState } from 'react';

const CatSlider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data, refetch, error, isLoading, isFetching } = useGetCatsQuery(10);

  const isEmpty: boolean =
    !!error || isLoading || isFetching || !data || data?.length === 0;

  const handlePrev: EmptyHandler = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (data?.length ?? 1) - 1 : prev - 1
    );
  };
  const handleNext: EmptyHandler = () => {
    setCurrentIndex((prev) =>
      prev === (data?.length ?? 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="card">
      <button onClick={() => refetch()} className="cta-button">
        Get new images
      </button>
      <div className="slider-wrapper">
        <button
          disabled={isEmpty}
          onClick={() => handlePrev()}
          className="left-button"
        >
          <img
            src={'chevron.svg'}
            alt="previous image"
            width={40}
            height={40}
          />
        </button>
        <div className="slider-content">
          <SliderContent
            currentIndex={currentIndex}
            onPrevImage={handlePrev}
            onNextImage={handleNext}
          />
        </div>
        <button
          disabled={isEmpty}
          onClick={() => handleNext()}
          className="right-button"
        >
          <img src={'chevron.svg'} alt="next image" width={40} height={40} />
        </button>
      </div>
      {!isEmpty && (
        <SliderDots currentIndex={currentIndex} count={data?.length ?? 1} />
      )}
    </div>
  );
};

export default CatSlider;
