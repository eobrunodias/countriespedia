"use client";

import { useEffect, useState } from "react";
import { Footer, Header, Card, Grid, Spinner } from "./components";
import { countriesApi } from "./services";
import { Country } from "./types/country";
import Link from "next/link";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

    setCountries(response);
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      <main className={`flex-1 items-center justify-center`}>
        {loading ? (
          <Spinner />
        ) : (
          <Grid>
            {countries.map(
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
        )}
      </main>
      <Footer />
    </>
  );
}
