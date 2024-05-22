import CatImage from '@/components/CatImage.tsx';
import { useGetCatsQuery } from '@/services/catsApi.ts';
import { FC } from 'react';

export type SliderContentProps = { currentIndex: number };

const SliderContent: FC<SliderContentProps> = (props) => {
  const { currentIndex } = props;

  const { data, error, isLoading, isFetching } = useGetCatsQuery(10);

  if (error) return <>Oh no, there was an error</>;
  if (isLoading || isFetching) return <>Loading...</>;
  if (!data || data?.length === 0) return <>No images</>;

  return data.map((cat, index) => (
    <CatImage imageIndex={index} displayedIndex={currentIndex} key={cat.id} />
  ));
};

export default SliderContent;
