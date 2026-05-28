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
    <label className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="text-base md:text-lg text-[#534129]/70 hidden">
        {field.label}
        {field.required ? "*" : ""}
      </span>
      <input
        type={field.type}
        name={field.name}
        required={field.required}
        placeholder={field.label}
        autoComplete={field.type === "email" ? "email" : undefined}
        className="w-full border-0 border-b border-[#534129]/40 bg-transparent pb-2 text-base md:text-lg text-[#171717] placeholder:text-[#534129]/40 focus:border-[#534129] focus:outline-none"
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
    <form className="flex flex-col gap-4 bg-[#FFFDCE] rounded-md p-8" onSubmit={handleSubmit} noValidate>
      {NAME_FIELDS.map((field) => (
        <FormFieldInput key={field.name} field={field} />
      ))}
      <div className="flex gap-4">
        {CONTACT_FIELDS.map((field) => (
          <FormFieldInput key={field.name} field={field} />
        ))}
      </div>
      <FormFieldInput field={COMPANY_FIELD} />
      <div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-[#38422A] px-3 py-2 text-base text-white transition-opacity hover:opacity-90 cursor-pointer"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
