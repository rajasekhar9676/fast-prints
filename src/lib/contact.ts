/** Normalize display phone like "+91 91647 79922" to digits for tel:/wa.me */
export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function telHref(phone: string) {
  const digits = phoneDigits(phone);
  return digits ? `tel:+${digits}` : "tel:+919164779922";
}

export function whatsappHref(phone: string, message?: string) {
  const digits = phoneDigits(phone);
  const base = `https://wa.me/${digits || "919164779922"}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function websiteHref(website: string) {
  if (!website) return "https://www.fastprintsdigital.in";
  if (website.startsWith("http://") || website.startsWith("https://")) return website;
  return `https://${website}`;
}
