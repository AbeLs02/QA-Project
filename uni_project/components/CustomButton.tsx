// components/CustomButton.tsx

import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";
import styles from "./css/customButton.module.css";

interface CustomButtonProps extends ButtonProps {
  customVariant?: "buttonPrimary" | "linkPrimary" | "linkSecondary";
}

const CustomButton: React.FC<React.PropsWithChildren<CustomButtonProps>> = ({
  customVariant = "buttonPrimary",
  children,
  className,
  ...rest
}) => {
  var buttonClass = styles.primaryButton
  if (customVariant === "linkPrimary") {
    buttonClass = styles.primaryLink;
  } else if (customVariant === "linkSecondary") {
    buttonClass = styles.secondaryLink;
  }

  return (
    <Button className={`${buttonClass} ${className || ""}`} {...rest}>
      {children}
    </Button>
  );
};

export default CustomButton;