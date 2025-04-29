import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href="/menu" className="bg-red-500 p-3 text-3xl">
        Cardapio
      </Link>
    </div>
  );
}
