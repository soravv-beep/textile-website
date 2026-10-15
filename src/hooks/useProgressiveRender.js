import { useCallback, useEffect, useRef, useState, useLayoutEffect } from "react";

export function useIntersectionObserver({ threshold = 0.1, rootMargin = "100px", triggerOnce = true } = {}) {
  const [node, setNode] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && triggerOnce) observer.disconnect();
    }, { threshold, rootMargin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, rootMargin, triggerOnce]);
  return [setNode, isIntersecting];
}

export function useProgressiveRender(items, initialCount = 12, batchSize = 12, loadDelay = 3000) {
  const [state, setState] = useState(() => ({ source: items, count: initialCount, loading: false, revealFrom: Infinity }));
  const timer = useRef(null);
  const generation = useRef(0);
  const observer = useRef(null);
  const autoLoadTimer = useRef(null);

  const current = state.source === items ? state : { source: items, count: initialCount, loading: false, revealFrom: Infinity };
  const live = useRef(current);
  live.current = current;
  const hasMore = current.count < items.length;

  const reset = useCallback(() => {
    generation.current += 1;
    clearTimeout(timer.current);
    clearTimeout(autoLoadTimer.current);
    timer.current = null;
    autoLoadTimer.current = null;
    const next = { source: items, count: initialCount, loading: false, revealFrom: Infinity };
    live.current = next;
    setState(next);
  }, [items, initialCount]);

  useLayoutEffect(() => {
    reset();
    return () => {
      generation.current += 1;
      clearTimeout(timer.current);
      clearTimeout(autoLoadTimer.current);
      timer.current = null;
      autoLoadTimer.current = null;
      observer.current?.disconnect();
    };
  }, [reset, batchSize, loadDelay]);

  const scheduleNextBatch = useCallback(() => {
    const prev = live.current;
    if (!prev || prev.loading || prev.source !== items || prev.count >= items.length) return;
    const token = generation.current;
    autoLoadTimer.current = setTimeout(() => {
      autoLoadTimer.current = null;
      if (token !== generation.current || live.current.source !== items) return;
      const next = {
        source: items,
        count: Math.min(prev.count + batchSize, items.length),
        loading: false,
        revealFrom: prev.count,
      };
      live.current = next;
      setState(next);
      if (next.count < items.length) {
        scheduleNextBatch();
      }
    }, loadDelay);
  }, [items, batchSize, loadDelay]);

  useEffect(() => {
    if (hasMore && !current.loading) {
      scheduleNextBatch();
    }
    return () => clearTimeout(autoLoadTimer.current);
  }, [hasMore, current.loading, current.count, items.length, scheduleNextBatch]);

  const loadMoreRef = useCallback((node) => {
    observer.current?.disconnect();
    if (!node || !hasMore || current.loading || typeof IntersectionObserver === "undefined") return;
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) scheduleNextBatch();
    }, { rootMargin: "200px", threshold: 0.1 });
    observer.current.observe(node);
  }, [hasMore, current.loading, scheduleNextBatch]);

  return {
    visibleItems: items.slice(0, current.count),
    pendingItems: items.slice(current.count, Math.min(current.count + batchSize, items.length)),
    hasMore,
    isLoading: current.loading,
    revealFrom: current.revealFrom,
    loadMoreRef,
    loadMore: scheduleNextBatch,
    reset,
    visibleCount: Math.min(current.count, items.length),
  };
}