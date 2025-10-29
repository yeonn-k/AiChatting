import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      green: string;
      green50: string;

      darkGreen: string;

      yellow: string;
      yellow50: string;

      ivory: string;
      lightGrey: string;
      grey: string;
      deepGrey: string;
      black: string;
      background: string;
      white: string;
    };
    font: {
      LogoFont: string;
      title: string;
      small: string;
    };
    device: {
      sm: string;
      md: string;
      lg: string;
      tabletLandscape: string;
    };
  }
}
