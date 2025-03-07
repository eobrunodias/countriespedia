import { CountryDetailed } from "../types/country";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(
    endpoint: string
  ): Promise<[CountryDetailed[] | CountryDetailed | null, string | null]> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        return [null, `HTTP error! Status: ${response.status}`];
      }

      if (Array.isArray(response)) {
        const data: CountryDetailed[] = await response.json();
        return [data, null];
      }

      const data: CountryDetailed = await response.json();
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

const baseQueryAll = "/all?fields=";
const baseFields = "name,cca3,region,capital,population,flags";

const countriesApiClient = new ApiClient(apiUrl!);

const countriesApi = {
  getAll: () => countriesApiClient.get(`${baseQueryAll}${baseFields}`),

  getCountry: (id: string) =>
    countriesApiClient.get(
      `/alpha/${id}?fields=${baseFields},languages,currencies,tld,borders`
    ),
};

export { countriesApi };
