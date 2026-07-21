export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max">
        {[0, 1].map((rep) => (
          <div key={rep} aria-hidden={rep === 1} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="font-serif px-12 text-2xl italic whitespace-nowrap opacity-60 md:text-3xl">
                  {item}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
