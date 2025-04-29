import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Link href="/menu" className="bg-red-500 p-3 text-3xl">
        Cardapio
      </Link>
    </div>
  );
}
