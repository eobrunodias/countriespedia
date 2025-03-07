import Image from "next/image";

type CardProps = {
  index: number;
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
};

export default function Card({
  index,
  name,
  capital,
  region,
  population,
  flag,
}: CardProps) {
  return (
    <div className="h-full overflow-hidden transition-all duration-300 ease-in-out transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
      <div className="w-full aspect-video">
        <Image
          src={flag || `/flag-placeholder.svg`}
          priority={index < 12}
          className="object-cover w-full h-full"
          alt={`Flag of ${name}`}
          width={500}
          height={300}
        />
      </div>
      <div className="p-6 text-sm text-gray-600">
        <h2 className="mb-4 text-xl font-semibold">{name}</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Capital:</span>
            <span>{capital}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">Region:</span>
            <span>{region}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">Population: </span>
            <span>{population}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
