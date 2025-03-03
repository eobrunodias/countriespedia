import Image from "next/image";

type CardProps = {
  id: number;
  country: string;
  capital: string;
  region: string;
  population: string;
};

export default function Card({
  country,
  capital,
  region,
  population,
}: CardProps) {
  return (
    <div className="bg-white overflow-hidden h-full rounded-lg shadow-lg">
      <div className="w-full aspect-video">
        <Image
          src="https://placehold.co/600x400"
          className="w-full h-full object-cover"
          alt="country image"
        />
      </div>
      <div className="p-6 text-sm text-gray-600">
        <h2 className="text-xl font-semibold mb-4">{country}</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold">example:</span>
            <span>{capital}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">example:</span>
            <span>{region}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">example:</span>
            <span>{population}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
