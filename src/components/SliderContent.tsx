import CatImage from '@/components/CatImage.tsx';
import { useGetCatsQuery } from '@/services/catsApi.ts';
import { EmptyHandler } from '@/types';
import { FC } from 'react';

export type SliderContentProps = {
  currentIndex: number;
  onPrevImage: EmptyHandler;
  onNextImage: EmptyHandler;
};

const SliderContent: FC<SliderContentProps> = (props) => {
  const { currentIndex, onPrevImage, onNextImage } = props;

  const { data, error, isLoading, isFetching } = useGetCatsQuery(10);

  // TODO: Add error Alert with icon
  if (error) return <>Oh no, there was an error</>;
  // TODO: Add spinning loader icon
  if (isLoading || isFetching) return <>Loading...</>;
  if (!data || data?.length === 0) return <>No images</>;

  return data.map((cat, index) => (
    <CatImage
      imageIndex={index}
      displayedIndex={currentIndex}
      onPrevImage={onPrevImage}
      onNextImage={onNextImage}
      key={cat.id}
    />
  ));
};

export default SliderContent;
