import { motion } from "framer-motion";

const STEPS = ["Shipping", "Payment", "Confirmation"];

export default function StepIndicator({ current }) {
  return (
    <ol className="co-steps">
      {STEPS.map((label, idx) => {
        const state = idx < current ? "done" : idx === current ? "active" : "pending";
        return (
          <li key={label} className={`co-step co-step--${state}`}>
            <span className="co-step__num">
              {idx < current ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : idx + 1}
            </span>
            <span className="co-step__label">{label}</span>
            {idx < STEPS.length - 1 && <span className="co-step__line" />}
          </li>
        );
      })}
    </ol>
  );
}

