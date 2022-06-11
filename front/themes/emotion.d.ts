import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends Record<string, any> {
    colors: {
      white: string;
      black: string;
      gray: {
        [key: number]: string;
      };
      red: {
        [key: number]: string;
      };
      orange: {
        [key: number]: string;
      };
      yellow: {
        [key: number]: string;
      };
      green: {
        [key: number]: string;
      };
      blue: {
        [key: number]: string;
      };
      purple: {
        [key: number]: string;
      };
    };
  }
}
