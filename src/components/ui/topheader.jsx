import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function TopHeader() {
  return (
    <header className="grid grid-cols-3 grid-rows-1 p-4 w-[100%]">
      {/* <h1 className="text-2xl font-bold">Logo</h1> */}
      <Link href="/" className="col-start-2 justify-self-center">
        <Image src={`/daily.svg`} alt="Daily" width={128} height={128} />
      </Link>
      <section className="justify-self-end self-center p-4">
        <ModeToggle />
      </section>
    </header>
  );
}
