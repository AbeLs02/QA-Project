// components/CustomButton.tsx

import React from "react";
import { Input } from "antd";
import type { InputProps } from "antd";
import styles from "./css/customInput.module.css";

interface CustomInputProps extends InputProps {
  customVariant?: "primary";
}

const CustomInput: React.FC<React.PropsWithChildren<CustomInputProps>> = ({
  customVariant = "primary",
  children,
  className,
  ...rest
}) => {
  const inputClass = styles.primaryInput

  return (
    <Input className={`${inputClass} ${className || ""}`} {...rest}>
      {children}
    </Input>
  );
};

export default CustomInput;