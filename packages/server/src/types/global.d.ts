declare namespace NodeJS {
  interface Global {
    __COUNTERS__: {
      values: { [key: string]: number };
      getValue: (key: string) => number;
      increase: (key: string) => void;
      clear: () => void;
    };
    __MONGO_URL__: string;
    __MONGO_DB_NAME__: string;
  }
}
