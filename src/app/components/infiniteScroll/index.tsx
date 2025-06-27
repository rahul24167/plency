'use client';

import { cn } from '@/src/app/lib/utils';
import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
}: {
  items: string[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards',
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse',
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '50s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '30s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '60s');
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        'md:scroller relative w-full md:overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_80%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex shrink-0 flex-wrap md:flex-nowrap gap-4 py-4',
          start && 'md:animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative max-w-[24rem] flex-shrink-0 md:rounded-xl"
          >
              <img
                src={item}
                alt={`Card ${idx + 1}`}
                className="h-full w-auto md:rounded-2xl border-2 border-primary/10 object-cover transition-all duration-300 hover:-translate-y-2 hover:border-primary/20"
              />
          </li>
        ))}
      </ul>
    </div>
  );
};