import { FC, ImgHTMLAttributes } from 'react';
import { useGetCatsQuery } from '../services/catsApi';

type CatImageProps = {
  imageIndex?: number;
} & ImgHTMLAttributes<HTMLImageElement>;

const CatImage: FC<CatImageProps> = (props) => {
  const { imageIndex, ...imageProps } = props;

  const { data, error, isLoading, isFetching } = useGetCatsQuery(10);

  const currentImage = data?.[imageIndex ?? 0];

  if (error || !currentImage?.url) return <>Oh no, there was an error</>;

  if (isLoading || isFetching) return <>Loading...</>;

  return (
    <img
      src={currentImage.url}
      alt="cat image"
      // loading="lazy"
      width={800}
      height={400}
      {...imageProps}
    />
  );
};

export default CatImage;
