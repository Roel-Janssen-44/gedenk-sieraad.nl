export default function Navbar() {
  return (
    <div className="py-20 mt-20 border-t-2 border-primary">
      <div className="container flex flex-col gap-8">
        <div className="">
          {/* Quote */}
          {/* <h5 className="font-tangerine text-5xl mb-3">Info paginas</h5> */}
          <ul className="list-disc pl-6">
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/werkwijze-en-productinfo"
              >
                Productinfo en werkwijze
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/polsmaat-meten"
              >
                Polsmaat meten
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/de-juiste-ringmaat-bepalen"
              >
                De juiste ringmaat bepalen
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/retouren-en-verzending"
              >
                Retouren en verzending
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/vision-mission-value"
              >
                Statement
              </a>
            </li>
            <li>
              <a
                className="py-1 block hover:opacity-60 transition-opacity"
                href="/pages/contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <ul className="">
          <li className="my-2">service@gedenk-sieraad.nl</li>
          <li className="my-2">& WhatsApp 06 43 79 15 84</li>
          <li className="my-2">Idere dag van 09:00 tot 21:00 uur</li>
          <li className="my-2">
            BTW nummer: NL001816537B08 <br /> en KvK nummer: 54210666
          </li>
        </ul>
      </div>
    </div>
  );
}
