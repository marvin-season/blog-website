import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createIntersectionObserver } from 'aio-tool';

export interface VirtualScrollOptions {
  row?: number;
  startIndex?: number;
  length?: number;
  acceleration?: number;
  buffer?: number;
}

export interface VirtualScrollResult {
  rootRef: React.RefObject<HTMLDivElement>;
  topTargetRef: React.RefObject<HTMLDivElement>;
  bottomTargetRef: React.RefObject<HTMLDivElement>;
  rows: number[];
  range: { startIndex: number; end: number };
}

export default function useVirtualScroll(options?: VirtualScrollOptions): VirtualScrollResult {
  const {
    row = 1000000,
    startIndex = 0,
    length = 2,
    acceleration = 1,
    buffer = 1,
  } = options || {};

  const rootRef = useRef<HTMLDivElement>(null);
  const topTargetRef = useRef<HTMLDivElement>(null);
  const bottomTargetRef = useRef<HTMLDivElement>(null);

  const [range, setRange] = useState({
    startIndex: startIndex - acceleration + buffer,
    end: startIndex - acceleration + buffer + length,
  });

  const rows = useMemo(() => {
    const sliceStart = Math.max(0, range.startIndex - buffer);
    const sliceEnd = Math.min(range.end + buffer, row);
    return new Array(row)
      .fill(0)
      .map((_, i) => i)
      .slice(sliceStart, sliceEnd);
  }, [row, range, buffer]);

  useEffect(() => {
    const observer = createIntersectionObserver({
      options: {
        root: rootRef.current,
        threshold: 1,
        rootMargin: "0px 0px 20px 0px",
      },
      targets: [topTargetRef.current, bottomTargetRef.current],
      onIntersecting: (entries) => {
        entries.forEach((entry) => {
          if (entry.target === topTargetRef.current) {
            setRange((prev) => ({
              startIndex: Math.max(0, prev.startIndex - acceleration),
              end: prev.end,
            }));
          } else if (entry.target === bottomTargetRef.current) {
            setRange((prev) => ({
              startIndex: prev.startIndex,
              end: Math.min(row, prev.end + acceleration),
            }));
          }
        });
      },
    });
    return () => {
      observer?.disconnect();
    };
  }, [acceleration, row]);

  return { rootRef, topTargetRef, bottomTargetRef, rows, range };
}