import clsx from "clsx";
import type { HTMLAttributes, JSX } from "react";

export type TypographyVariant =
  | "display-1"
  | "display-2"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "body-large"
  | "body-medium"
  | "body"
  | "body-small"
  | "body-x-small"
  | "body-2x-small";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BoxProps<T = any> extends HTMLAttributes<T> {
  // keyof takes an object type and returns a union of its keys
  as?: keyof JSX.IntrinsicElements;
}

export type Props = {
  variant?: TypographyVariant;
  tabletVariant?: TypographyVariant;
  desktopVariant?: TypographyVariant;
  xlDesktopVariant?: TypographyVariant;
  xl2DesktopVariant?: TypographyVariant;
} & BoxProps;

const classes: Record<TypographyVariant, string> = {
  "display-1": "text-[56px]",
  "display-2": "text-[48px]",
  "heading-1": "text-[40px]",
  "heading-2": "text-[32px]",
  "heading-3": "text-[30px]",
  "heading-4": "text-[26px]",
  "heading-5": "text-[22px]",
  "body-large": "text-[20px]",
  "body-medium": "text-[18px]",
  body: "text-[16px]",
  "body-small": "text-[14px]",
  "body-x-small": "text-[12px]",
  "body-2x-small": "text-[10px]",
};

const tabletClasses: Record<TypographyVariant, string> = {
  "display-1": "md:text-[56px]",
  "display-2": "md:text-[48px]",
  "heading-1": "md:text-[40px]",
  "heading-2": "md:text-[32px]",
  "heading-3": "md:text-[30px]",
  "heading-4": "md:text-[26px]",
  "heading-5": "md:text-[22px]",
  "body-large": "md:text-[20px]",
  "body-medium": "md:text-[18px]",
  body: "md:text-[16px]",
  "body-small": "md:text-[14px]",
  "body-x-small": "md:text-[12px]",
  "body-2x-small": "md:text-[10px]",
};

const desktopClasses: Record<TypographyVariant, string> = {
  "display-1": "lg:text-[56px]",
  "display-2": "lg:text-[48px]",
  "heading-1": "lg:text-[40px]",
  "heading-2": "lg:text-[32px]",
  "heading-3": "lg:text-[30px]",
  "heading-4": "lg:text-[26px]",
  "heading-5": "lg:text-[22px]",
  "body-large": "lg:text-[20px]",
  "body-medium": "lg:text-[18px]",
  body: "lg:text-[16px]",
  "body-small": "lg:text-[14px]",
  "body-x-small": "lg:text-[12px]",
  "body-2x-small": "lg:text-[10px]",
};

const xlDesktopClasses: Record<TypographyVariant, string> = {
  "display-1": "xl:text-[56px]",
  "display-2": "xl:text-[48px]",
  "heading-1": "xl:text-[40px]",
  "heading-2": "xl:text-[32px]",
  "heading-3": "xl:text-[30px]",
  "heading-4": "xl:text-[26px]",
  "heading-5": "xl:text-[22px]",
  "body-large": "xl:text-[20px]",
  "body-medium": "xl:text-[18px]",
  body: "xl:text-[16px]",
  "body-small": "xl:text-[14px]",
  "body-x-small": "xl:text-[12px]",
  "body-2x-small": "xl:text-[10px]",
};

const xl2DesktopClasses: Record<TypographyVariant, string> = {
  "display-1": "2xl:text-[56px]",
  "display-2": "2xl:text-[48px]",
  "heading-1": "2xl:text-[40px]",
  "heading-2": "2xl:text-[32px]",
  "heading-3": "2xl:text-[30px]",
  "heading-4": "2xl:text-[26px]",
  "heading-5": "2xl:text-[22px]",
  "body-large": "2xl:text-[20px]",
  "body-medium": "2xl:text-[18px]",
  body: "2xl:text-[16px]",
  "body-small": "2xl:text-[14px]",
  "body-x-small": "2xl:text-[12px]",
  "body-2x-small": "2xl:text-[10px]",
};

const Box = ({ as = "div", ...props }: BoxProps) => {
  const Tag = as;
  return <Tag data-testid="box" {...props} />;
};

const Typography = (props: Props) => {
  const {
    children,
    as = "p",
    className = "",
    variant = "body",
    tabletVariant,
    desktopVariant,
    xlDesktopVariant,
    xl2DesktopVariant,
    ...otherProps
  } = props;

  const baseClass = `text leading-[1.5] ${classes[variant]}`;
  const tabletVariantClass = tabletVariant ? tabletClasses[tabletVariant] : "";
  const desktopVariantClass = desktopVariant
    ? desktopClasses[desktopVariant]
    : "";
  const xlDesktopVariantClass = xlDesktopVariant
    ? xlDesktopClasses[xlDesktopVariant]
    : "";
  const xl2DesktopVariantClass = xl2DesktopVariant
    ? xl2DesktopClasses[xl2DesktopVariant]
    : "";

  return (
    <Box
      as={as}
      className={clsx(baseClass, {
        [`${className}`]: className,
        [`${tabletVariantClass}`]: tabletVariantClass,
        [`${desktopVariantClass}`]: desktopVariantClass,
        [`${xlDesktopVariantClass}`]: xlDesktopVariantClass,
        [`${xl2DesktopVariantClass}`]: xl2DesktopVariantClass,
      })}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export default Typography;
