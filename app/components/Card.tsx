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
    <div className="bg-white overflow-hidden h-full rounded-lg shadow-lg">
      <div className="w-full aspect-video">
        <Image
          src={flag || "https://placehold.co/600x400"}
          priority={index < 12}
          className="w-full h-full object-cover"
          alt={`Flag of ${name}`}
          width={500}
          height={300}
        />
      </div>
      <div className="p-6 text-sm text-gray-600">
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
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
