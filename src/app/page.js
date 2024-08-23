import Image from "next/image";
import TopHeader from "@/components/ui/topheader";

export default function Home() {
  return (
    <>
      <TopHeader />
      <main className="m-0 p-0">
        <h1 className="text-2xl font-bold">Home</h1>
      </main>
    </>
  );
}
