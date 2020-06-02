import Fonts from "./libs/fonts";

export default {
  UIShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  UIColors: {
    primary: "#0779e4",
    secondary: "#070d2f",
    danger: "#eb4559",
    text: "#333",
    background: "#f1f5f9",
    success: "#4caf50",
    warning: "#ffb367",
  },
  UIFontSize: 14,
  UIFontFamily: Fonts.NotoSansRegular,
  UIImageLoading: require("./assets/images/logo.png"),
  UIImageError: require("./assets/images/404.png"),
};
