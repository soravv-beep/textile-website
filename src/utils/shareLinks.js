/**
 * Share link generators for WhatsApp and Pinterest
 */
export const shareLinks = (look) => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${look.title} · WovenHaat Lookbook`);
  return {
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`,
  };
};