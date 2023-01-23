export type ItemLinkValue<T extends string = string> = {
  fields: {
    Value: {
      value: T;
    };
  };
};

export type Theme = "light" | "dark" | "grey" | "pink";
export type XdsTheme = ItemLinkValue<Theme>;
