import type { ContactBlock as ContactBlockData } from "../../types";
import Pill from "../components/Pill";
import ContactBlockForm from "./ContactBlockForm";

interface ContactBlockProps {
  data?: Omit<ContactBlockData, "_type" | "_key">;
}

export default function ContactBlock({ data }: ContactBlockProps) {

  return (
    <section>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-x-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-6 md:col-span-12">
          <div className="bg-white py-4 w-fit">
            {data.heading ? (
              <Pill variant="yellow">{data.heading}</Pill>
            ) : null}
          </div>
        </div>
        <div className="col-span-6 md:col-span-5">
          <div className="bg-white py-4">
            {data?.description ? (
              <p className="text-3xl md:text-4xl lg:text-5xl">
                {data?.description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="col-span-6 md:col-start-7 md:col-span-5">
          <div className="bg-white py-4">
            <ContactBlockForm submitLabel={data?.submitLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}