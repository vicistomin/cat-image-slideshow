import { useGetCatsQuery } from '@/services/catsApi';
import { FC, ImgHTMLAttributes, useMemo } from 'react';

type CatImageProps = {
  imageIndex?: number;
  displayedIndex?: number;
} & ImgHTMLAttributes<HTMLImageElement>;

const CatImage: FC<CatImageProps> = (props) => {
  const { imageIndex = 0, displayedIndex = 0, ...imageProps } = props;

  const { data } = useGetCatsQuery(10);

  const imageUrl = data?.[imageIndex ?? 0]?.url ?? '/';
  const lastImageIndex = (data?.length ?? 1) - 1;

  const isCurrent = displayedIndex === imageIndex;
  const isPrev =
    displayedIndex > 0
      ? imageIndex === displayedIndex - 1
      : imageIndex === lastImageIndex;
  const isNext =
    displayedIndex === lastImageIndex
      ? imageIndex === 0
      : imageIndex === displayedIndex + 1;

  // Only 3 images would be rendered simultaneously at any moment of time
  const isDisplayed = isCurrent || isPrev || isNext;

  const left = useMemo<string>(() => {
    if (isPrev) return '-100%';
    if (isCurrent) return '0';
    if (isNext) return '100%';

    return '100%';
  }, [isPrev, isNext, isCurrent]);

  const top = useMemo<string>(() => {
    if (imageIndex === 0) return '0';
    if (imageIndex === 1 && !isPrev) return '-100%';
    if (imageIndex === lastImageIndex - 1 ?? !isNext) return '-100%';
    if (imageIndex === lastImageIndex) return '-200%';

    if (isPrev) return '0';
    if (isCurrent) return '-100%';
    if (isNext) return '-200%';

    return '0';
  }, [lastImageIndex, isPrev, isNext, isCurrent]);

  return (
    <img
      src={imageUrl}
      alt="cat image"
      loading={isDisplayed ? 'eager' : 'lazy'}
      width={800}
      height={400}
      style={{
        display: isDisplayed ? 'block' : 'none',
        position: 'relative',
        left,
        top,
        right: 0,
        ...imageProps.style,
      }}
      {...imageProps}
    />
  );
};

export default CatImage;
