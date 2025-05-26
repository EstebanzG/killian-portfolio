export function Header() {
  return (
    <div className={"relative border border-amber-200 h-[85dvh] w-auto aspect-[1/2] sm:aspect-[3/2]"}>
      <img src="/images/portrait.png" alt={"background"} className="w-full h-full object-cover"/>

      <header className="absolute top-0 left-0 w-full h-full z-10 text-white text-4xl md:text-6xl lg:text-8xl 2xl:text-9xl font-bold blur-[1px] title-animation">
        <h1 className={"absolute left-[3%] lg:left-[14%] top-[12%] lg:top-[10%]"}>KILLIAN</h1>
        <h1 className={"absolute right-[5%] lg:right-[10%] top-[17%] lg:top-[22%]"}>GOMEZ</h1>
      </header>

      <img src="/images/portrait-cutout.png" alt={"portrait of Killian GOMEZ"} className={"absolute top-0 left-0 z-10 w-full h-full object-cover"}/>
    </div>
  );
}