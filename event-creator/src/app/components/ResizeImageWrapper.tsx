import { useRef, useEffect } from "react";

type Media = {
  url: string;
  type: "IMAGE" | "VIDEO";
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zIndex: number;
};
interface ImageWrapperProps {
  image: Media;
  index: number;
  selectedImage: number;
  setImages: React.Dispatch<React.SetStateAction<Media[]>>;
  children: React.ReactNode;
}

export const ResizableImageWrapper = ({
  image,
  index,
  selectedImage,
  setImages,
  children,
}: ImageWrapperProps) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const newHeight = entry.contentRect.height;
      const vwInPx = window.innerWidth;
      const heightInVw = (newHeight / vwInPx) * 100;

      setImages((prev) => {
        if (selectedImage < 0 || selectedImage >= prev.length) return prev;
        const newImages = [...prev];
        newImages[selectedImage].height = heightInVw;
        return newImages;
      });
    });

    observer.observe(divRef.current);

    return () => observer.disconnect();
  }, [index, selectedImage, setImages]);

  return (
    <div
      ref={divRef}
      className={`relative ${
        index === selectedImage ? "border-2 border-red-500" : ""
      }`}
      style={{
        width: `${image.width}vw`,
        marginLeft: `${image.positionX}vw`,
        marginTop: `${image.positionY}vw`,
        zIndex: image.zIndex,
      }}
    >
      {children}
    </div>
  );
};
