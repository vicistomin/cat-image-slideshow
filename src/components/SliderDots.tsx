import { FC } from 'react';

export type SliderDotsProps = {
  count: number;
  currentIndex: number;
};

// TODO: Implement clickable dots
const SliderDots: FC<SliderDotsProps> = (props) => {
  const { count, currentIndex } = props;

  return (
    <div className="slider-dots-container">
      {Array.from({ length: count }).map((_, index) => {
        return (
          <div
            className="slider-dot"
            style={{ width: index === currentIndex ? 60 : '' }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default SliderDots;
