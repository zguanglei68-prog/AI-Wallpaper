interface HeroProps {
  title: React.ReactNode;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <>
      <h1 className="my-5 text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl text-primary">
        {title}
      </h1>
      <h2 className="mx-auto mb-4 text-center text-sm text-[#636262] sm:h2x-8 sm:text-xl md:px-24 lg:mb-4">
        {description}
      </h2>
    </>
  );
}
