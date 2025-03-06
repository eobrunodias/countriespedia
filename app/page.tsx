"use client";

import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import { Card, Error, Grid, Loading } from "./components";
import { countriesApi } from "./services";
import { Country } from "./types/country";
import Link from "next/link";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  async function fetchCountries() {
    const [response, error] = await countriesApi.getAll();
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    if (!response) {
      return;
    }

    if (!Array.isArray(response)) {
      setError("Format invalid response");
      return;
    }

    setCountries(response);
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  const sortedCountries = [...countries].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.common.localeCompare(b.name.common, "en-US")
      : b.name.common.localeCompare(a.name.common, "en-US")
  );

  function toggleSortOrder() {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  if (loading) return <Loading />;
  if (error) return <Error text={error} />;

  return (
    <>
      <div className="flex items-center justify-end">
        <button onClick={toggleSortOrder}>
          {sortOrder === "desc" ? (
            <ArrowUpIcon className="size-9 text-gray-300 m-6" />
          ) : (
            <ArrowDownIcon className="size-9 text-gray-300 m-6" />
          )}
        </button>
      </div>
      <Grid>
        {sortedCountries.map(
          ({ name, cca3, capital, region, population, flags }, index) => {
            const [capitalName] = capital ?? [];
            const { common: countryName } = name ?? {};
            const { svg: flag } = flags ?? {};

            return (
              <Link href={`/country/${cca3}`} key={cca3}>
                <Card
                  index={index}
                  capital={capitalName}
                  name={countryName}
                  region={region}
                  population={population}
                  flag={flag}
                />
              </Link>
            );
          }
        )}
      </Grid>
    </>
  );
}
