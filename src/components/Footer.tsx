import { contact, footer } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/40 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-body text-[11px] tracking-[0.06em] text-slate-500">{footer.copyright}</p>

        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${contact.instagramHandle} on Instagram`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="h-[18px] w-[18px]"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>

        <p className="font-body text-[11px] tracking-[0.06em] text-slate-500">{footer.credit}</p>
      </div>
    </footer>
  );
}
