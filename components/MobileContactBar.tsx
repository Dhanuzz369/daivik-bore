import { CalendarDays, Mail, MessageCircle, Phone } from "lucide-react";
import { brand } from "@/data/site";

export function MobileContactBar() {
  return <nav className="mobile-contact" aria-label="Quick contact">
    <a href={brand.phoneHref}><Phone size={18} aria-hidden="true" /><span>Call</span></a>
    <a href={brand.whatsapp}><MessageCircle size={18} aria-hidden="true" /><span>WhatsApp</span></a>
    <a href={brand.emailHref}><Mail size={18} aria-hidden="true" /><span>Email</span></a>
    <a href="#site-visit"><CalendarDays size={18} aria-hidden="true" /><span>Site visit</span></a>
  </nav>;
}
