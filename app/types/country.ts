export interface Country {
  name: Name;
  cca3: string;
  region: string;
  capital: string[];
  population: number;
  flags: Flags;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  eng: Eng;
}

export interface Eng {
  official: string;
  common: string;
}

export interface Flags {
  png: string;
  svg: string;
}
