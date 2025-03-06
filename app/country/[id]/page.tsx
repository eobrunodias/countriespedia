"use client";

import { Error, Loading } from "@/app/components";
import { countriesApi } from "@/app/services";
import { CountryDetailed } from "@/app/types/country";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Params = {
  id: string;
};

export default function Country() {
  const [id, setId] = useState<string | null>(null);
  const params = useParams<Params>();
  const [country, setCountry] = useState<CountryDetailed | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params) {
      if (params.id) {
        setId(params.id);
      }
    }
  }, [params]);

  useEffect(() => {
    async function fetchCountries() {
      if (!id) {
        return;
      }

      const [response, error] = await countriesApi.getCountry(id);
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      if (!response) {
        return;
      }

      if (Array.isArray(response)) {
        setError("Format invalid response");
        return;
      }

      setCountry(response);
    }

    fetchCountries();
  });

  const {
    borders,
    capital,
    currencies,
    flags,
    languages,
    name,
    population,
    region,
    tld,
  } = country ?? {};

  const { svg: flag } = flags ?? {};
  const { common: countryName, official: officialName } = name ?? {};
  const [capitalName] = capital ?? [];
  const currenciesNames = Object.values(currencies ?? {})
    .map(({ name, symbol }) => `${name} (${symbol})`)
    .join(", ");
  const languagesNames = Object.values(languages ?? {}).join(", ");
  const [topLevelDomain] = tld ?? [];
  const bordersIds = borders ?? [];

  if (loading) return <Loading />;
  if (error) return <Error text={error} />;

  return (
    <>
      <div className="mb-8">
        <Link href={`/`}>
          <button className="bg-gray-600 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
            Back
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="">
          <Image
            src={`${flag || "/flag-placeholder.svg"}`}
            alt={`Flag of `}
            className="max-h-80 object-cover rounded-lg"
            priority
            width={600}
            height={400}
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-sm">
          <h2 className="text-xl font-semibold mb-4">
            {countryName} ({id})
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Official Name:</span>{" "}
              {officialName}
            </div>
            <div>
              <span className="font-semibold">Capital:</span> {capitalName}
            </div>
            <div>
              <span className="font-semibold">Region:</span> {region}
            </div>
            <div>
              <span className="font-semibold">Population:</span> {population}
            </div>
            <div>
              <span className="font-semibold">Languages:</span> {languagesNames}
            </div>
            <div>
              <span className="font-semibold">Currencies:</span>{" "}
              {currenciesNames}
            </div>
            <div>
              <span className="font-semibold">Top Level Domain:</span>{" "}
              {topLevelDomain}
            </div>
            <div>
              <span className="font-semibold">Borders: </span>
              {bordersIds.length > 0
                ? bordersIds.map((borderId) => (
                    <Link key={borderId} href={`/country/${borderId}`}>
                      <button
                        className="bg-gray-700 hover:bg-gray-600
                          text-xs mb-[6px] mr-[6px] py-[1.5px] px-[6px] rounded"
                      >
                        {borderId}
                      </button>
                    </Link>
                  ))
                : "None"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
