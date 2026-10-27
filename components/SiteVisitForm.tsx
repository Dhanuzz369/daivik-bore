"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { brand, solutions } from "@/data/site";

export function SiteVisitForm() {
  const [requirement, setRequirement] = useState("");
  const [messageUrl, setMessageUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    setReady(true);
    const fromHash = () => {
      const key = window.location.hash.replace("#site-visit-", "");
      if (solutions.some((item) => item.key === key)) {
        setRequirement(key);
        document.getElementById("site-visit")?.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Enter your name.";
    if (!/^[+\d\s()-]+$/.test(phone) || digits.length < 10 || digits.length > 15) nextErrors.phone = "Enter a phone number with 10 to 15 digits.";
    if (!location) nextErrors.location = "Enter your site location.";
    if (!requirement) nextErrors.requirement = "Select your requirement.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    const label = solutions.find((item) => item.key === requirement)?.label ?? requirement;
    const message = [
      "Hi Daivik Borewells, I would like a free site visit for my property.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Location: ${location}`,
      `Requirement: ${label}`,
      "Please contact me to discuss access and availability.",
    ].join("\n");
    const url = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
    setMessageUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return <form className="visit-form" noValidate={ready} onSubmit={submit} onChange={() => { setMessageUrl(""); setErrors({}); }}>
    <div className="form-heading"><MessageCircle size={21} aria-hidden="true" /><span>Let&apos;s start with your site.</span></div>
    <div className="form-fields">
      <label>Your name<input name="name" autoComplete="name" required maxLength={80} placeholder="Full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <span id="name-error" className="form-error">{errors.name}</span>}</label>
      <label>Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} placeholder="Your mobile number" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />{errors.phone && <span id="phone-error" className="form-error">{errors.phone}</span>}</label>
      <label>Site location<input name="location" autoComplete="address-level2" required maxLength={150} placeholder="Area in Bengaluru" aria-invalid={!!errors.location} aria-describedby={errors.location ? "location-error" : undefined} />{errors.location && <span id="location-error" className="form-error">{errors.location}</span>}</label>
      <label><span id="requirement-label">Requirement</span><select name="requirement" aria-labelledby="requirement-label" value={requirement} onChange={(event) => setRequirement(event.target.value)} required aria-invalid={!!errors.requirement} aria-describedby={errors.requirement ? "requirement-error" : undefined}>
        <option value="" disabled>Select property or service</option>
        {solutions.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
        <option value="Pump installation">Pump installation</option>
        <option value="Borewell deepening">Borewell deepening</option>
        <option value="Not sure yet">Not sure yet</option>
      </select>{errors.requirement && <span id="requirement-error" className="form-error">{errors.requirement}</span>}</label>
    </div>
    {Object.keys(errors).length > 0 && <p className="form-error" role="alert">Check the highlighted fields.</p>}
    <button type="submit" disabled={!ready} className="button button-primary form-submit">Get free site visit <ArrowUpRight size={18} aria-hidden="true" /></button>
    <noscript><p className="form-note">Arrange your free site visit by <a href={brand.phoneHref}>calling us</a> or <a href={brand.whatsapp}>contacting us on WhatsApp</a>.</p></noscript>
    <p className="form-note">Continue in WhatsApp to send your request. We&apos;ll confirm the visit with you.</p>
    {messageUrl && <div className="form-success" role="status"><CheckCircle2 size={19} aria-hidden="true" /><div>Your message is ready, not yet sent.{" "}<br /><a href={messageUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp to send it <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>}
    <details className="privacy-note"><summary>How your details are used</summary><p>This form does not store your details on the website. They are included in a WhatsApp message for you to review and send to Daivik Borewells about this enquiry. WhatsApp&apos;s own privacy terms apply.</p></details>
  </form>;
}
