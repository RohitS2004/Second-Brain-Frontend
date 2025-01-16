import { forwardRef } from "react";

type TextSizeTypes = "md" | "lg" | "xl" | "2xl" | "none";
type TextWeightTypes = "normal" | "medium" | "semibold" | "bold" | "none";
type TextColorTypes = "black" | "primary" | "none";
type BackgroundColorTypes = "transparent" | "slate" | "none";

interface InputProps {
    flexProperties?: string,
    labelText?: string,
    labelTextColor?: TextColorTypes,
    labelTextSize?: TextSizeTypes,
    labelTextWeight?: TextWeightTypes,
    labelClasses?: string,
    inputPlaceholder: string,
    inputType: string,
    inputTextSize: TextSizeTypes,
    inputTextWeight: TextWeightTypes,
    inputTextColor: TextColorTypes,
    inputBorderRadius: string,
    inputBackgroundColor: BackgroundColorTypes,
    inputPadding: string,
    inputOutline: string,
    inputBorder: string,
    inputClasses: string,
}

const TextSize = {
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    none: "",
}

const TextColor = {
    black: "text-black",
    primary: "text-primary",
    none: "",
}

const TextWeight = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    none: "",
}

const BackgroundColor = {
    transparent: "bg-transparent",
    slate: "bg-slate-200",
    none: "",
}

const Input = (props: InputProps, ref: any) => {
    return (
        <div
        className={`
                ${props.flexProperties}
            `}
        >
            <label
            className={`
                ${TextColor[props.labelTextColor || "none"]}
                ${TextSize[props.labelTextSize || "none"]}
                ${TextWeight[props.labelTextWeight || "none"]}
                ${props.labelClasses}
                `}
            >
                {
                    props.labelText
                }
            </label>
            <input 
            className={`
                    ${TextSize[props.inputTextSize]}
                    ${TextWeight[props.inputTextWeight]}
                    ${TextColor[props.inputTextColor]}
                    ${BackgroundColor[props.inputBackgroundColor]}
                    ${props.inputPadding}
                    ${props.inputOutline}
                    ${props.inputBorder}
                    ${props.inputBorderRadius}
                    ${props.inputClasses}
                `}
            type={props.inputType}
            placeholder={props.inputPlaceholder}
            ref={ref}
            />
        </div>
    )
}

export default forwardRef(Input);