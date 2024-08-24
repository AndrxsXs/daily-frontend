import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="m-0 p-0 w-[100%] h-[60dvh]">
        <article className="items-center grid grid-cols-2 grid-rows-1 gap-10 p-4 mx-auto w-[70%] h-[100%]">
          <Image
            src={`/hero.jpeg`}
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-lg justify-self-end"
          />
          <section>
            <header>
              <h1 className="text-3xl font-bold inline">Organiza tu día con</h1>
              <Image
                src="/daily.svg"
                alt="Daily"
                width={85}
                height={85}
                className="inline ml-1 translate-y-[-7px]"
              />
            </header>
            <p className="text-lg mt-4">
              Daily es una aplicación web que te permite organizar tu día a día
              de manera fácil y rápida.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
