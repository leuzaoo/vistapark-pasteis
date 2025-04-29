"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon, ShoppingBasketIcon } from "lucide-react";

export default function Homepage() {
  return (
    <>
      <section className="bg-primary-red relative h-screen overflow-hidden lg:grid lg:grid-cols-2">
        <div className="relative hidden h-full w-full lg:block">
          <Image
            src="/pastel-bg.avif"
            fill
            quality={100}
            alt="Pastel background"
            className="object-cover"
          />
        </div>

        <div className="relative h-full">
          <div className="flex flex-col items-center py-10 text-white">
            <div className="flex items-center justify-center">
              <Image
                src="/pastel-icon.svg"
                width={120}
                height={120}
                alt="Logo da pastelaria"
                quality={100}
              />
            </div>
            <h1 className="font-agbalumo text-primary-yellow mt-4 text-center text-7xl leading-14">
              Pastel
              <br />
              <span className="text-light text-5xl">VistaPark</span>
            </h1>
          </div>

          <div className="bg-light mx-auto h-full w-full rounded-t-[120px] pt-10">
            <div className="font-sriracha px-6 text-center">
              <p className="text-[28px] md:text-5xl lg:text-[28px] xl:text-5xl">
                <span className="text-primary-red">Fome?</span> Resolvemos
                rápido
              </p>
              <p className="md:text-2xl lg:text-base xl:text-2xl">
                Quentinho e rápido, do jeito que você gosta!
              </p>

              <Link
                href="/menu"
                className="mt-10 inline-flex items-center space-x-2"
              >
                <div className="flex items-center justify-between gap-6 rounded-full bg-white pr-3 shadow-sm transition hover:opacity-75 md:gap-12">
                  <div className="bg-primary-red flex size-14 items-center justify-center rounded-full text-white md:size-20">
                    <ShoppingBasketIcon className="size-8 md:size-12" />
                  </div>
                  <span className="text-[28px] md:text-4xl">Pedir agora</span>
                  <ChevronRightIcon className="size-6 md:size-8" />
                </div>
              </Link>
            </div>
            <footer className="mt-10 text-center text-xs xl:mt-20">
              © 2025 – Todos os direitos reservados
            </footer>
          </div>
        </div>
      </section>
    </>
  );
}
