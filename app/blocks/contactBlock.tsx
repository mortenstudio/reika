import type { ContactBlock as ContactBlockData } from "../../types";
import ContactBlockForm from "./ContactBlockForm";

interface ContactBlockProps {
  data?: Omit<ContactBlockData, "_type" | "_key">;
}

export default function ContactBlock({ data }: ContactBlockProps) {

  return (
    <section>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-60">
        <div className="col-span-6 md:col-span-5">
          <div className="flex flex-col gap-8 bg-white py-4">
            {data?.heading ? (
              <h2 className="text-xs font-mono uppercase bg-[#FFEA7D] text-black rounded-full px-2 py-1 w-fit">
                {data?.heading}
              </h2>
            ) : null}
            {data?.description ? (
              <p className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                {data?.description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="col-span-6 md:col-start-7 md:col-span-5 mt-15">
          <div className="py-4 bg-white">
            <ContactBlockForm submitLabel={data?.submitLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}