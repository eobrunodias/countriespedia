import Link from "next/link";

interface CountryProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Country({ params }: CountryProps) {
  const id = (await params).id;

  return (
    <div>
      <h1>{`Country Page ${id}`}</h1>
      <Link href={`/`}>
        <button>Back</button>
      </Link>
    </div>
  );
}
