export type WineType = {
  Alcohol: number;
  Ash: string | number;
  Magnesium: number;
  Flavanoids: string | number;
  Hue: number;
  Gamma?: number;
};

export type WineDataType = Array<WineType>;
