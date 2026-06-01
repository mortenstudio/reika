"use client";

import { FormEvent } from "react";

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

function FormFieldInput({ field }: { field: FormField }) {
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
        placeholder={field.label}
        autoComplete={field.type === "email" ? "email" : undefined}
        className="w-full border-0 border-b border-black/40 bg-transparent pb-2 text-xs md:text-sm lg:text-base text-black placeholder:text-black/40 focus:border-black focus:outline-none"
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
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="flex flex-col gap-4 md:gap-6 lg:gap-8 bg-[#FFFDCE] rounded-md p-4 md:p-6 lg:p-8" onSubmit={handleSubmit} noValidate>
      {NAME_FIELDS.map((field) => (
        <FormFieldInput key={field.name} field={field} />
      ))}
      <div className="flex gap-4 md:gap-6 lg:gap-8">
        {CONTACT_FIELDS.map((field) => (
          <FormFieldInput key={field.name} field={field} />
        ))}
      </div>
      <FormFieldInput field={COMPANY_FIELD} />
      <div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-[#38422A] px-3 py-2 text-xs md:text-sm lg:text-base text-white transition-opacity hover:opacity-90 cursor-pointer select-none"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
