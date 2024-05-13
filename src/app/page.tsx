"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <section className="container mt-0 sm:mt-6">
        <div className="mx-auto grid max-w-screen-2xl px-4 pt-20 lg:grid-cols-12 lg:gap-8  lg:pt-28 xl:gap-0">
          <div className="mr-auto place-self-center  lg:col-span-7">
            <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-none tracking-tight text-white lg:text-5xl xl:text-6xl">
              Lorem ipsum dolor sit amet consectetur
              <br />
            </h1>

            <p className="md:text-xllg:mb-8 mb-6 max-w-2xl font-mono font-light text-gray-500 lg:text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              quo maiores hic vero asperiores voluptas, explicabo soluta fugit
              cumque non nemo, earum a corporis delectus, alias dolorum quod
              dignissimos libero!
            </p>

            <div className="mb-4 space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
              <Button
                variant={"default"}
                // className="h-12 min-w-[4rem] gap-2 rounded-xl border border-white/10 bg-primary px-4 py-3 font-bold text-foreground lg:min-w-[8rem] lg:rounded-2xl"
                className="h-12 min-w-[4rem] gap-2 rounded-xl border border-white/10  px-4 py-3 font-bold text-foreground lg:min-w-[8rem] lg:rounded-2xl"
                translate="no"
              >
                Play
              </Button>
            </div>
          </div>
          <div className=" lg:col-span-5 lg:mt-0 lg:flex"></div>
        </div>
      </section>
    </>
  );
}
