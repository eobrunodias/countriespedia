export interface Country {
  name: Name;
  cca3: string;
  region: string;
  capital: string[];
  population: number;
  flags: Flags;
}

export interface CountryDetailed extends Country {
  tld: string[];
  currencies: Currencies;
  languages: Languages;
  borders: string[];
}

export type Name = {
  common: string;
  official: string;
  nativeName: NativeName;
};

export type NativeName = {
  eng: Eng;
};

export type Eng = {
  official: string;
  common: string;
};

export type Flags = {
  png: string;
  svg: string;
};

export type Currencies = {
  SHP: Shp;
};

export type Shp = {
  name: string;
  symbol: string;
};

export type Languages = {
  eng: string;
};
