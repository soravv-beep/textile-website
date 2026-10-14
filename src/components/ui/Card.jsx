/**
 * <Card /> — white surface, 12px radius, soft shadow.
 *
 * @param {object} props
 * @param {"div"|"article"|"aside"|"li"} [props.as="div"]
 * @param {number} [props.radius=12] 12 | 16 | 24 (use 24 for feature/form cards)
 * @param {React.ReactNode} [props.media] image placed above the body
 * @param {boolean} [props.padded=true] add --sp-5 body padding when no children wrapper
 * @param {boolean} [props.tilt=false] subtle 3D tilt + glare on hover (auto-off on touch)
 * @param {boolean} [props.spotlight=false] cursor-following soft glow on the card
 */
import { useTilt } from "../../animations/useTilt.js";

export default function Card({
  as: Tag = "div",
  radius = 12,
  media = null,
  padded = true,
  tilt = false,
  spotlight = false,
  className = "",
  children,
  ...rest
}) {
  const tiltRef = useTilt({ max: 8, enabled: tilt });
  const classes = [
    "card",
    padded ? "card--padded" : "",
    spotlight ? "has-spotlight" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={tilt ? tiltRef : undefined}
      className={classes}
      style={{ "--card-radius": `${radius}px` }}
      {...rest}
    >
      {media}
      {children}
    </Tag>
  );
}
