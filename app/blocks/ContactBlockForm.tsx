"use client";

import { FormEvent, useState, useRef, useEffect, useCallback } from "react";

type FormField = {
  label: string;
  name: string;
  type: string;
  required: boolean;
};

const NAME_FIELDS: FormField[] = [
  { label: "Fornavn", name: "firstName", type: "text", required: true },
  { label: "Etternavn", name: "lastName", type: "text", required: true },
];

const CONTACT_FIELDS: FormField[] = [
  { label: "Telefonnummer", name: "phone", type: "tel", required: true },
  { label: "E-post", name: "email", type: "email", required: true },
];

const COMPANY_FIELD: FormField = {
  label: "Firma",
  name: "company",
  type: "text",
  required: false,
};

function FormFieldInput({
  field,
  disabled,
}: {
  field: FormField;
  disabled: boolean;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col">
      <span className="hidden">
        {field.label}
        {field.required ? "*" : ""}
      </span>
      <input
        type={field.type}
        name={field.name}
        required={field.required}
        disabled={disabled}
        placeholder={field.label}
        autoComplete={field.type === "email" ? "email" : undefined}
        className="w-full border-0 border-b border-black/40 bg-transparent pb-2 text-xs md:text-sm lg:text-base text-black placeholder:text-black/40 focus:border-black focus:outline-none disabled:opacity-50"
      />
    </label>
  );
}

function Dropdown({
  label,
  name,
  options,
  required,
  disabled,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, close]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") close();
  }

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <input type="hidden" name={name} value={selected ?? ""} />
      {required && !selected && (
        <input
          tabIndex={-1}
          className="absolute inset-0 opacity-0 pointer-events-none"
          required
          value=""
          onChange={() => {}}
        />
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between border-0 border-b border-black/40 bg-transparent pb-2 text-left text-xs md:text-sm lg:text-base focus:border-black focus:outline-none disabled:opacity-50 cursor-pointer"
      >
        <span className={selected ? "text-black" : "text-black/40"}>
          {selected ?? label}
        </span>
        <svg
          className={`h-3 w-3 shrink-0 text-black/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>
      {open && (
        <ul className="absolute left-0 right-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-md bg-[#FFFDCE] shadow-md">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  setSelected(opt);
                  close();
                }}
                className={`w-full cursor-pointer px-3 py-2 text-left text-xs md:text-sm lg:text-base transition-colors hover:bg-black/5 ${
                  selected === opt
                    ? "font-medium text-black"
                    : "text-black/70"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface ContactBlockFormProps {
  submitLabel: string;
  modelNames: string[];
}

export default function ContactBlockForm({
  submitLabel,
  modelNames,
}: ContactBlockFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.error || "Kunne ikke sende skjema. Prøv igjen senere.",
        );
      }

      setIsSuccess(true);
      formRef.current?.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Kunne ikke sende skjema. Prøv igjen senere.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-md bg-[#FFFDCE] p-4 md:p-6 lg:p-8 text-center">
        <p className="text-sm md:text-base lg:text-lg text-black">
          Takk for din henvendelse! Vi tar kontakt snart.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="text-xs md:text-sm text-black/60 underline underline-offset-2 hover:text-black cursor-pointer"
        >
          Send en ny henvendelse
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 md:gap-6 lg:gap-8 bg-[#FFFDCE] rounded-md p-4 md:p-6 lg:p-8"
      onSubmit={handleSubmit}
      noValidate
    >
      {error && (
        <p className="text-xs md:text-sm text-red-600">{error}</p>
      )}
      {NAME_FIELDS.map((field) => (
        <FormFieldInput key={field.name} field={field} disabled={isLoading} />
      ))}
      <Dropdown
        label="Har du/dere allerede tomt?"
        name="hasProperty"
        options={["Ja", "Nei"]}
        disabled={isLoading}
      />
      {modelNames.length > 0 && (
        <Dropdown
          label="Hvilken modell er du/dere interessert i?"
          name="interestedModel"
          options={modelNames}
          disabled={isLoading}
        />
      )}
      <div className="flex gap-4 md:gap-6 lg:gap-8">
        {CONTACT_FIELDS.map((field) => (
          <FormFieldInput key={field.name} field={field} disabled={isLoading} />
        ))}
      </div>
      <FormFieldInput field={COMPANY_FIELD} disabled={isLoading} />
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            name="privacyConsent"
            required
            disabled={isLoading}
            className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-black/40 checked:bg-[#38422A] disabled:opacity-50"
          />
          <svg
            className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 6l2.5 2.5 4.5-5" />
          </svg>
        </span>
        <span className="text-xs md:text-sm text-black/70">
          Jeg samtykker til at opplysningene mine lagres og brukes til å
          besvare min henvendelse i henhold til{" "}
          <a
            href="/personvern"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-xs md:text-sm lg:text-base underline underline-offset-3 decoration-1 decoration-black/33 hover:decoration-transparent transition-all duration-200"
          >
            personvernerklæringen
          </a>
          .
        </span>
      </label>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 rounded-md bg-[#38422A] px-3 py-2 text-xs md:text-sm lg:text-base text-white transition-opacity hover:opacity-90 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sender..." : "Send forespørsel"}
        </button>
      </div>
    </form>
  );
}
