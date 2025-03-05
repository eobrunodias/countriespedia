import { CountryDetailed } from "../types/country";

class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(
    endpoint: string
  ): Promise<[CountryDetailed[] | null, string | null]> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        return [null, `HTTP error! Status: ${response.status}`];
      }

      const data: CountryDetailed[] = await response.json();

      return [data, null];
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return [null, error.message];
      }
      return [null, "An unknown error occurred"];
    }
  }
}

const baseUrl = "https://restcountries.com/v3.1";
const baseEndpoint = "/all?fields=name,cca3,region,capital,population,flags";
const countriesApiClient = new ApiClient(baseUrl);

const countriesApi = {
  getAll: async () => {
    return await countriesApiClient.get(
      `${baseEndpoint},languages,currencies,tld,borders`
    );
  },
};

export { countriesApi };
