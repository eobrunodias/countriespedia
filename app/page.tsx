"use client";

import { useEffect, useState } from "react";
import { Footer, Header, Card, Grid, Spinner } from "./components";
import { Country } from "./types/country";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCountries() {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca3,region,capital,population,flags"
      );
      const data: Country[] = await response.json();
      setCountries(data);
    } catch (err) {
      setError(error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

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
                  <Card
                    index={index}
                    key={cca3}
                    capital={capitalName}
                    name={countryName}
                    region={region}
                    population={population}
                    flag={flag}
                  />
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
