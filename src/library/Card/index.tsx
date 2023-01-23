import React from "react";
import classnames from "classnames";

import { Box, PolymorphicComponentProps } from "react-polymorphic-box";
import "./index.css";

export type CardOwnProps = {
  theme?: string;
  light?: string;
  className?: string;
  excludeBorder?: boolean;
  excludePadding?: boolean;
  excludeShadow?: boolean;
  rounded?: boolean;
  overflow?: boolean;
  samepletext?: string;
};

export type CardProps<E extends React.ElementType> = PolymorphicComponentProps<
  E,
  CardOwnProps
>;

const defaultElement = "div";

function Card<E extends React.ElementType = typeof defaultElement>({
  className: parentClassName,
  excludeBorder = false,
  excludePadding = false,
  excludeShadow = false,
  rounded = true,
  overflow = false,
  ...props
}: CardProps<E>): JSX.Element {
  const showParentClassBackground =
    parentClassName?.includes("theme-xds") ||
    parentClassName?.includes("bg-fill") ||
    parentClassName?.includes("bg-material");
  return (
    <Box
      data-testid="Card"
      data-component="Card"
      as={defaultElement}
      className={classnames(
        "block border-0 w-full text-left",
        {
          "bg-material-1": !showParentClassBackground,
          "p-4 md:px-6": !excludePadding,
          "shadow-4": !excludeShadow,
          "rounded-medium": rounded,
          "border card-border-shell border-solid": !excludeBorder,
          "overflow-hidden": !overflow,
        },
        parentClassName
      )}
      {...props}
      {...props.samepletext}
    />
  );
}

export default Card;

Card.displayName = "Card";
