import reset from "styled-reset";
import { createGlobalStyle, DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

export const lightTheme: DefaultTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
    }
`;
