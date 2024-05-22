import { useGetCatsQuery } from '@/services/catsApi';
import { EmptyHandler } from '@/types';
import {
  FC,
  ImgHTMLAttributes,
  MouseEvent,
  TouchEvent,
  useMemo,
  useRef,
  useState,
} from 'react';

type CatImageProps = {
  imageIndex?: number;
  displayedIndex?: number;
  onPrevImage: EmptyHandler;
  onNextImage: EmptyHandler;
} & ImgHTMLAttributes<HTMLImageElement>;

const CatImage: FC<CatImageProps> = (props) => {
  const {
    imageIndex = 0,
    displayedIndex = 0,
    onPrevImage,
    onNextImage,
    ...imageProps
  } = props;
  // Offset value used for mouse dragging and touch gestures
  const [offset, setOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);

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
    if (isPrev) return `calc(${offset}px - 100%)`;
    if (isCurrent) return `${offset}px`;
    if (isNext) return `calc(${offset}px + 100%)`;

    return '100%';
  }, [isPrev, isNext, isCurrent, offset]);

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

  const handleDragStart = (
    e: MouseEvent<HTMLImageElement> | TouchEvent<HTMLImageElement>
  ) => {
    setIsDragging(true);
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (
    e: MouseEvent<HTMLImageElement> | TouchEvent<HTMLImageElement>
  ) => {
    if (!isDragging) return;

    currentX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newOffset = currentX.current - startX.current;
    setOffset(newOffset);
  };

  const handleDragEnd = () => {
    // Minimum drag distance to trigger a slide change
    setIsDragging(false);
    const threshold = 100;
    if (offset > threshold) {
      // Slide to previous image
      onPrevImage();
    } else if (offset < -threshold) {
      // Slide to next image
      onNextImage();
    }
    setOffset(0);
  };

  return (
    <img
      src={imageUrl}
      alt="cat image"
      loading={isDisplayed ? 'eager' : 'lazy'}
      width="100%"
      height="auto"
      draggable={false}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      style={{
        display: isDisplayed ? 'block' : 'none',
        left,
        top,
        transition: isDragging ? 'none' : 'left 0.5s ease',
        ...imageProps.style,
      }}
      {...imageProps}
    />
  );
};

export default CatImage;
