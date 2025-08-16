export type SearchMontos = () => Promise<
  {
    name: string;
    addresses: {
      url: string;
    }[];
  }[]
>;
