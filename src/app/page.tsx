"use client";
import { Button } from "@/components/ui/button";
import chess from "../../public/images/landing-chess.jpg"
import Image from "next/image";
import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";

export default function Home() {
  return (
    <>
      <section className="h-[100vh] top-0 w-full bg-gray-900 flex items-center justify-center">
      
        <div className="container">
        <Meteors number={20}/>
          <div className="mx-auto grid max-w-screen-2xl px-4 pt-20 lg:grid-cols-12 lg:gap-8  lg:pt-28 xl:gap-0">
            <div className="mr-auto place-self-center  lg:col-span-7">
              <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-none tracking-tight text-white lg:text-5xl xl:text-5xl">
                ChessUp: Strategy Meets the Blockchain
                <br />
              </h1>

              <p className="md:text-xl lg:mb-8 mb-6 max-w-2xl font-sans font-light text-gray-500 lg:text-2xl">
                In the world of digital board games, OnChain Chess stands out by
                integrating the timeless game of chess with the cutting-edge
                technology of blockchain. This is not just a game; it&apos;s an
                experience, a community, and a new chapter in the world of
                decentralized gaming.
              </p>

              <div className="mb-4 space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                <Link href="/mode">
                <Button
                  variant={"outline"}
                  // className="h-12 min-w-[4rem] gap-2 rounded-xl border border-white/10 bg-primary px-4 py-3 font-bold text-foreground lg:min-w-[8rem] lg:rounded-2xl"
                  className="h-12 min-w-[4rem] gap-2 rounded-xl border border-white/10 bg-white  px-4 py-3 font-bold text-foreground lg:min-w-[8rem] lg:rounded-2xl hover:shadow-2xl"
                  translate="no"
                >
                  Play
                </Button>
                </Link>
              </div>
            </div>
            <div className=" lg:col-span-5 lg:mt-0 lg:flex">
            <Image src={chess} alt=""  className="rounded-xl shadow-2xl shadow-emerald-500/[0.1]"/>
            </div>
          </div>
   
        </div>
        
      </section>
    </>
  );
}
