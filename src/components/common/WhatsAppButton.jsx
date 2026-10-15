import { MessageCircle } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/911234567890?text=Hello%20WovenHaat%2C%20I%20have%20a%20question.";

export default function WhatsAppButton({ lifted }) {
  return (
    <a className={`whatsapp-fab ${lifted ? "lifted" : ""}`} href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
      <MessageCircle />
      <span>Chat</span>
    </a>
  );
}
