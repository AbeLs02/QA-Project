// components/CustomButton.tsx

import React from "react";
import { Input } from "antd";
import type { InputProps } from "antd";
import styles from "./css/customInput.module.css";

const {TextArea} = Input
interface CustomInputProps extends InputProps {
  customVariant?: "primary" | "TextArea";
}

const CustomInput: React.FC<React.PropsWithChildren<CustomInputProps>> = ({
  customVariant = "primary",
  className,
  ...rest
}) => {
  const inputClass = styles.primaryInput

  return (
    
    customVariant === "primary" ? <Input className={`${inputClass} ${className || ""}`} {...rest} /> : <TextArea  className={`${inputClass} ${className || ""}`} {...rest}/>
  );
};

export default CustomInput;