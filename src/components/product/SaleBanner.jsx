/**
 * <SaleBanner /> — the discount strip that sits inside the top of a product card.
 *
 * Left: discount badge icon + "30% sale off" (the number is bolded).
 * Right: live countdown in three dark rounded boxes "HH : MM : SS".
 *
 * It renders nothing unless there is a REAL deadline in the future, so no card
 * ever shows a fake or evergreen timer. The visible digits are aria-hidden and a
 * single visually-hidden line announces the remaining time at most once a
 * minute (see useCountdown's `label`).
 *
 * @param {object} props
 * @param {number} [props.percent] discount percentage (e.g. 30)
 * @param {string|Date} props.endsAt the real sale end date
 * @param {string} [props.className]
 */
import { useCountdown } from "../../animations/useCountdown.js";
import { useReducedMotion } from "../../animations/useReducedMotion.js";

const TOTAL_STEPS = 3;

/** One dark timer box. The digit fades/flips only when its value changes. */
function TimeBox({ value, unit }) {
  return (
    <span className="sale-banner__box" data-unit={unit}>
      <span className="sale-banner__digit" key={value}>
        {value}
      </span>
    </span>
  );
}

export default function SaleBanner({ percent, endsAt, className = "" }) {
  const { days, hours, minutes, seconds, expired, pad, label } = useCountdown(endsAt);
  const reduced = useReducedMotion();

  if (expired) return null;

  // Countdown reads as HH:MM:SS; days are folded into hours so the three boxes
  // keep their fixed width (a 3-day sale shows up to 72 hours).
  const totalHours = days * 24 + hours;
  const steps = [pad(totalHours), pad(minutes), pad(seconds)];

  return (
    <div
      className={["sale-banner", reduced ? "is-reduced" : "", className].filter(Boolean).join(" ")}
    >
      <span className="sale-banner__discount">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20.6 12.6 12 21l-9-9 8.4-8.6H20a1 1 0 0 1 1 1v7.2a1 1 0 0 1-.4.8Z" />
          <circle cx="16.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
        {percent ? (
          <span>
            <strong>{percent}%</strong> sale off
          </span>
        ) : (
          <span>Sale</span>
        )}
      </span>

      <span className="sale-banner__timer" aria-hidden="true">
        {steps.map((value, index) => (
          <span className="sale-banner__group" key={index}>
            <TimeBox value={value} unit={["hours", "minutes", "seconds"][index]} />
            {index < TOTAL_STEPS - 1 && <span className="sale-banner__colon">:</span>}
          </span>
        ))}
      </span>

      <span className="visually-hidden" aria-live="polite">
        {label}
      </span>
    </div>
  );
}
