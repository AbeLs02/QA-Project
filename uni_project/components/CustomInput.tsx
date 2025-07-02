// components/CustomButton.tsx

import React from "react";
import { Input } from "antd";
import type { InputProps, TextAreaProps } from "antd/es/input";
import styles from "./css/customInput.module.css";

const {TextArea} = Input

type CustomInputProps =
  | ({ customVariant?: "primary" } & InputProps)
  | ({ customVariant: "TextArea" } & TextAreaProps);

const CustomInput: React.FC<React.PropsWithChildren<CustomInputProps>> = ({
  customVariant = "primary",
  className,
  ...rest
}) => {
  const inputClass = styles.primaryInput

  if (customVariant==="TextArea"){
    return <TextArea  className={`${inputClass} ${className || ""}`} {...rest as TextAreaProps}/>
  }
  return<Input className={`${inputClass} ${className || ""}`} {...rest as InputProps} />

};

export default CustomInput;