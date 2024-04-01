import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="pb-[2000px]">
      <section className="bg-yellow-500 border-black border-b-[1.5px]">
        <div className="container max-w-6xl ">
          <div className="flex flex-col justify-between gap-5 py-20">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl tracking-tighter">
              Human stories <br />
              and ideas
            </h1>
            <p className="text-lg sm:text-2xl max-w-[750px]">
              Discover perspectives that deepen understanding. Share insights on
              a simple, beautiful, collaborative writing platform.
            </p>

            <Button className="rounded-3xl text-white w-fit px-10">
              Start reading
            </Button>
          </div>
        </div>
      </section>
      <div className="container max-w-6xl">hthththgtgt</div>
    </div>
  );
}
