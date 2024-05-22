import { useGetCatsQuery } from '@/services/catsApi';
import { FC, ImgHTMLAttributes } from 'react';

type CatImageProps = {
  imageIndex?: number;
  displayedIndex?: number;
} & ImgHTMLAttributes<HTMLImageElement>;

const CatImage: FC<CatImageProps> = (props) => {
  const { imageIndex = 0, displayedIndex = 0, ...imageProps } = props;

  const { data } = useGetCatsQuery(10);

  const imageUrl = data?.[imageIndex ?? 0]?.url ?? '/';
  const isDisplayed = displayedIndex === imageIndex;
  const isPrev = displayedIndex === imageIndex + 1;
  const isNext = displayedIndex === imageIndex - 1;

  return (
    <img
      src={imageUrl}
      alt="cat image"
      loading={isDisplayed || isPrev || isNext ? 'eager' : 'lazy'}
      width={800}
      height={400}
      style={{
        display: isDisplayed ? 'block' : 'none',
        ...imageProps.style,
      }}
      {...imageProps}
    />
  );
};

export default CatImage;
