import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../../constants/routes.js";
import { Button } from "../../components/ui/index.js";

export default function ConfirmationStep({ order }) {
  return (
    <motion.div className="co-confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}>
      <div className="co-confirm__check">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 className="co-confirm__title">Order Confirmed!</h2>
      <p className="co-confirm__id">Order ID: <strong>{order.id}</strong></p>
      <p className="co-confirm__text">
        Thank you! Your handwoven treasures are being prepared and will be shipped shortly.
      </p>
      {order.estimatedDelivery && (
        <div className="co-confirm__eta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>
            Estimated delivery:{" "}
            <strong>
              {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </strong>
          </span>
        </div>
      )}
      <div className="co-confirm__actions">
        <Button as={Link} to={ROUTES.orders} id="checkout-view-orders">Track My Order</Button>
        <Button as={Link} to={ROUTES.shop} variant="outline" id="checkout-continue-shopping">Continue Shopping</Button>
      </div>
    </motion.div>
  );
}

