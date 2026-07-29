"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { contact } from "@/data/content";
import ImageSlot from "./ImageSlot";
import Reveal from "./Reveal";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialForm: FormState = { name: "", email: "", message: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClasses =
  "mt-3 w-full border-b border-slate-700 bg-transparent pb-3 font-body text-sm text-text outline-none transition-colors duration-300 focus:border-accent";

const labelClasses = "block font-body text-[10px] uppercase tracking-[0.28em] text-slate-300";

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const validate = (values: FormState): Partial<FormState> => {
    const nextErrors: Partial<FormState> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Tell us a bit about your project.";
    return nextErrors;
  };

  const handleChange =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [field]: value }));
      // Clear a field's error as soon as it's corrected, rather than leaving stale text.
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      // PLACEHOLDER SUBMIT — swap this endpoint (or the route it points at) for a
      // real email service such as Resend, Formspree, or SendGrid before launch.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="absolute inset-0">
        <ImageSlot
          src={contact.image}
          alt={contact.imageAlt}
          label="Contact Background"
          sizes="100vw"
          className="h-full w-full"
          imageClassName="saturate-[0.4] brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/92 to-ink/75" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.45em] text-accent">
              {contact.eyebrow}
            </p>
            <h2 className="mt-5 max-w-sm font-display text-4xl leading-[1.05] tracking-[-0.01em] text-text sm:text-5xl">
              {contact.heading}
            </h2>
            <p className="mt-7 max-w-sm font-body text-sm leading-relaxed text-text-muted">
              {contact.subheading}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-spark px-7 py-4 font-body text-[10px] uppercase tracking-[0.28em] text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              {contact.dmCta}
              <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-4 font-body text-[11px] tracking-[0.1em] text-slate-500">
              {contact.instagramHandle}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form onSubmit={handleSubmit} noValidate className="space-y-9">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                className={fieldClasses}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 font-body text-[11px] text-spark">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className={fieldClasses}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 font-body text-[11px] text-spark">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                Message / Project Type
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={handleChange("message")}
                className={`${fieldClasses} resize-none`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-2 font-body text-[11px] text-spark">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex items-center gap-3 border-b border-accent pb-2 font-body text-[10px] uppercase tracking-[0.28em] text-accent transition-colors duration-300 hover:text-text disabled:opacity-50"
            >
              {status === "submitting" ? "Sending" : "Send Message"}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            {status === "success" && (
              <p role="status" className="font-body text-[13px] text-icy">
                Thanks — your message has been sent. We&apos;ll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="font-body text-[13px] text-spark">
                Something went wrong sending your message. Please try again, or DM on Instagram.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
