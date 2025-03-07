"use client";

import { useEffect, useState } from "react";
import { Card, Error, Grid, Loading, SortButton } from "./components";
import { countriesApi } from "./services";
import { Country } from "./types/country";
import Link from "next/link";
import Search from "./components/Search";
import Select from "./components/Select";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string>("All regions");

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

  const regions = [
    "All regions",
    ...new Set(countries.map(({ region }) => region)),
  ];

  const sortedCountries = [...countries].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.common.localeCompare(b.name.common, "en-US")
      : b.name.common.localeCompare(a.name.common, "en-US")
  );

  const filteredCountries = sortedCountries.filter(({ name, region }) => {
    const nameMatches = name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const regionMatches = selected === "All regions" || region === selected;

    return nameMatches && regionMatches;
  });

  function toggleSortOrder() {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  if (loading) return <Loading />;
  if (error) return <Error text={error} />;

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <Search
          search={search}
          setSearch={setSearch}
          count={filteredCountries.length}
        />
        <Select
          options={regions}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <SortButton sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
      <Grid>
        {filteredCountries.map(
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
