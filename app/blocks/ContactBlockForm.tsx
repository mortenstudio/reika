"use client";

import { FormEvent, useState, useRef } from "react";

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

interface ContactBlockFormProps {
  submitLabel: string;
}

export default function ContactBlockForm({
  submitLabel,
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
      <div className="flex gap-4 md:gap-6 lg:gap-8">
        {CONTACT_FIELDS.map((field) => (
          <FormFieldInput key={field.name} field={field} disabled={isLoading} />
        ))}
      </div>
      <FormFieldInput field={COMPANY_FIELD} disabled={isLoading} />
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
