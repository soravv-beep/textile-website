/**
 * Payment & Checkout — WovenHaat (Dev 3 / Manav Chotai)
 * Step 1: Shipping  →  Step 2: Payment method
 *   COD: place order immediately
 *   Online → sub-step: Card / UPI / Net Banking / Wallets
 *     Card: card details form
 *     UPI: QR code + VPA input
 *     Net Banking: bank dropdown + account form
 *     Wallets: wallet selector (Paytm, PhonePe, Amazon Pay, GPay)
 * Step 3: Confirmation with order ID + ETA
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";
import { ROUTES } from "../../constants/routes.js";
import { Container } from "../../components/ui/index.js";
import PageMeta from "../../components/PageMeta.jsx";

import StepIndicator from "./StepIndicator.jsx";
import OrderSummary from "./OrderSummary.jsx";
import ShippingStep from "./ShippingStep.jsx";
import PaymentMethodStep from "./PaymentMethodStep.jsx";
import OnlinePayStep from "./OnlinePayStep.jsx";
import ConfirmationStep from "./ConfirmationStep.jsx";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;

export default function PaymentPage() {
  const { items, count, clear } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=shipping, 1=method, 2=online, 3=confirm
  const [shippingData, setShippingData] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (count === 0 && step < 3) navigate(ROUTES.cart, { replace: true });
  }, [count, step, navigate]);

  const handleShippingDone = (data) => {
    setShippingData(data);
    setStep(1);
  };

  const handlePaymentSuccess = (method, paymentData) => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const order = placeOrder({
      items: [...items],
      shippingAddress: shippingData,
      paymentMethod: method,
      subtotal,
      shippingCost,
      total: subtotal + shippingCost,
    });
    clear();
    setPlacedOrder(order);
    setStep(3);
  };

  const handleCOD = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handlePaymentSuccess("cod", {});
    }, 600);
  };

  const stepIndex = step === 3 ? 2 : step > 1 ? 1 : step;

  return (
    <>
      <PageMeta title="Checkout & Payment — WovenHaat" description="Secure checkout and payment. Pay online or cash on delivery." />
      <div className="co-page">
        <Container>
          <StepIndicator current={stepIndex} />
          <div className="co-layout">
            <div className="co-main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 0 && (
                    <ShippingStep onNext={handleShippingDone} defaultValues={shippingData} />
                  )}
                  {step === 1 && (
                    <PaymentMethodStep
                      shipping={shippingData}
                      items={items}
                      onBack={() => setStep(0)}
                      onCOD={handleCOD}
                      onOnline={() => setStep(2)}
                    />
                  )}
                  {step === 2 && (
                    <OnlinePayStep
                      items={items}
                      onBack={() => setStep(1)}
                      onSuccess={handlePaymentSuccess}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  )}
                  {step === 3 && placedOrder && (
                    <ConfirmationStep order={placedOrder} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            {step < 3 && <OrderSummary items={items} />}
          </div>
        </Container>
      </div>
    </>
  );
}

