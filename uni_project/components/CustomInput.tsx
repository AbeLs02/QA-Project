// components/CustomButton.tsx

import React from "react";
import { Input, Select } from "antd";
import type { InputProps, TextAreaProps } from "antd/es/input";
import type { SelectProps } from "antd";
import styles from "./css/customInput.module.css";

const {TextArea} = Input

type CustomInputProps =
  | ({ customVariant?: "primary" } & InputProps)
  | ({ customVariant?: "Select" } & SelectProps)
  | ({ customVariant: "TextArea" } & TextAreaProps);

const CustomInput: React.FC<React.PropsWithChildren<CustomInputProps>> = ({
  customVariant = "primary",
  className,
  ...rest
}) => {
  const inputClass = styles.primaryInput

  if (customVariant==="TextArea"){
    return <TextArea  className={`${inputClass} ${className || ""}`} rows={10} {...rest as TextAreaProps}/>
  } else if (customVariant==="Select"){
    return <Select 
            className={`${className || ""}`}
            rootClassName={styles.selectRoot}
            classNames={{
              popup:{
                root: styles.selectDropdown
              }
            }}
            allowClear
            style={{color: "#111827"}}
            variant="borderless"
            {...rest as SelectProps}/>
  }
  return<Input className={`${inputClass} ${className || ""}`} {...rest as InputProps} />

};

export default CustomInput;