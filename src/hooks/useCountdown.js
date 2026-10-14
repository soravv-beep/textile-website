/**
 * useCountdown(endsAt) — live countdown to a real ISO date.
 *
 *   const { days, hours, minutes, seconds, expired, label } = useCountdown(product.saleEndsAt);
 *
 * Rules baked in on purpose:
 *  - never invents a deadline: pass `null`/`undefined` and `expired` is true, so
 *    callers hide the whole sale banner instead of showing an evergreen timer,
 *  - stops the interval as soon as the deadline passes (no idle ticking),
 *  - also accepts a Date object.
 *
 * @param {string|Date|null|undefined} endsAt ISO string or Date
 * @returns {{ days:number, hours:number, minutes:number, seconds:number,
 *             expired:boolean, totalMs:number, label:string }}
 */
import { useEffect, useMemo, useState } from "react";

const toMs = (value) => {
  if (!value) return null;
  const ms = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
};

const pad = (value) => String(value).padStart(2, "0");

export function useCountdown(endsAt) {
  const target = useMemo(() => toMs(endsAt), [endsAt]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (target == null) return undefined;
    setNow(Date.now());
    const id = window.setInterval(() => {
      const stamp = Date.now();
      setNow(stamp);
      if (stamp >= target) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const totalMs = target == null ? 0 : Math.max(0, target - now);
  const expired = target == null || totalMs <= 0;

  const days = Math.floor(totalMs / 86400000);
  const hours = Math.floor((totalMs % 86400000) / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);

  // Human sentence used for the aria-live announcement (updated per minute, not
  // per second, so screen readers are not spammed).
  const label = expired
    ? "Sale ended"
    : days > 0
      ? `Sale ends in ${days} day${days === 1 ? "" : "s"} and ${hours} hour${hours === 1 ? "" : "s"}`
      : `Sale ends in ${hours > 0 ? `${hours} hour${hours === 1 ? "" : "s"} and ` : ""}${minutes} minute${minutes === 1 ? "" : "s"}`;

  return { days, hours, minutes, seconds, expired, totalMs, pad, label };
}

export default useCountdown;
