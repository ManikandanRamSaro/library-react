import React, { FC, ReactNode } from "react";
import { Box } from "react-polymorphic-box";
import classnames from "classnames";
//import { XdsTheme } from "../../../../utils/src/lib/types";
import { XdsTheme } from "../../Support/types";
import "./index.css";

export interface XdsPadding {
  fields: {
    Value: {
      value: string;
    };
  };
}

interface XdsProps {
  xdsTheme?: XdsTheme;
  xdsPadding?: XdsPadding;
  xdsPaddingTop?: XdsPadding;
  xdsPaddingBottom?: XdsPadding;
  [key: string]: unknown;
}

export interface ContainerProps {
  as?: Parameters<typeof Box>[0]["as"];
  xds?: XdsProps;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export interface AttributesProps {
  theme?: string;
  className?: string;
}

const getPaddingClasses = (append: string, padding?: XdsPadding): string => {
  switch (padding?.fields?.Value?.value) {
    case "xsmall":
      return `theme-pad-16${append} lg:theme-pad-24${append} xl:theme-pad-24${append}`;
    case "small":
      return `theme-pad-24${append} md:theme-pad-32${append} lg:theme-pad-40${append} xl:theme-pad-40${append}`;
    case "smallfixed":
      return `theme-pad-24${append}`;
    case "smallmedium":
      return `theme-pad-40${append} md:theme-pad-48${append} lg:theme-pad-56${append}`;
    case "medium":
      return `theme-pad-40${append} md:theme-pad-48${append} lg:theme-pad-64${append} xl:theme-pad-80${append}`;
    case "large":
      return `theme-pad-80${append} md:theme-pad-96${append} lg:theme-pad-112${append} xl:theme-pad-128${append}`;
    case "xlarge":
      return `theme-pad-104${append} md:theme-pad-144${append} lg:theme-pad-200${append} xl:theme-pad-256${append}`;
  }
  return "";
};

const getPaddingTopClasses = (padding?: XdsPadding) =>
  getPaddingClasses("t", padding);
const getPaddingBottomClasses = (padding?: XdsPadding) =>
  getPaddingClasses("b", padding);

// add the theme=[theme value] and [theme value] attributes
const getTheme = (theme?: XdsTheme): any => {
  if (!theme?.fields?.Value?.value) return {};
  const themeValue = (theme?.fields.Value.value as string) ?? "light";
  const themeAttributes = {
    theme: themeValue,
  } as any;
  themeAttributes[themeValue] = "";
  return themeAttributes;
};

const Container: FC<ContainerProps> = ({
  as = "div",
  xds,
  className,
  children = [],
  ...rest
}) => {
  const classes: string = classnames(
    className,
    getPaddingTopClasses(xds?.xdsPaddingTop),
    getPaddingBottomClasses(xds?.xdsPaddingBottom)
  );

  return (
    <Box as={as} {...getTheme(xds?.xdsTheme)} className={classes} {...rest}>
      {children}
    </Box>
  );
};
export default Container;
Container.displayName = "Container";
