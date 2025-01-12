import { ReactElement } from "react";

type backgroundColorTypes = "transparent" | "slate" | "primary" | "secondary" | "gradient"
type fontColorTypes = "black" | "white" | "primary" | "secondary"
type fontSizeTypes = "md" | "lg" | "xl" | "2xl" | "3xl";
type fontWeightTypes = "normal" | "semibold" | "bold" | "extrabold";
type borderRadiusTypes = "sm" | "md" | "lg" | "xl" | "2xl" | "none";

interface ButtonProps {
    buttonIcon?: ReactElement,
    buttonText?: string,
    buttonWidth: string,
    buttonPadding: string,
    buttonMargin?: string,
    onHoverClasses: string,
    onActiveClasses: string,
    flexProperties?: string,
    classes?: string,
    borderRadius?: borderRadiusTypes,
    backgroundColor: backgroundColorTypes,
    fontColor?: fontColorTypes,
    fontSize: fontSizeTypes,
    fontWeight: fontWeightTypes,
    onClick: () => void,
    buttonClasses?: string,
}

const BackgroundColor = {
    transparent: "bg-transparent",
    slate: "bg-slate",
    primary: "bg-primary",
    secondary: "bg-secondary",
    gradient: "bg-gradient-to-r from-gradientFrom to-gradientTo",
}

const FontColor = {
    black: "text-black",
    white: "text-white",
    primary: "text-primary",
    secondary: "text-secondary",
}

const FontSize = {
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
}

const FontWeight = {
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
}

const BorderRadius = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "none": "",
}

const Button = (props: ButtonProps) => {
    return (
        <button
        className={`
            ${props.buttonWidth}
            ${props.buttonPadding}
            ${props.buttonMargin}
            ${props.onHoverClasses}
            ${props.onActiveClasses}
            ${props.flexProperties}
            ${props.classes}
            ${BorderRadius[props.borderRadius || "none"]}
            ${BackgroundColor[props.backgroundColor]}
            ${FontColor[props.fontColor || "black"]}
            ${FontSize[props.fontSize]}
            ${FontWeight[props.fontWeight]}
            `}
        onClick={props.onClick}
        >
            {props.buttonIcon && props.buttonIcon}
            <span className={`${props.buttonClasses}`}>{props.buttonText && props.buttonText}</span>
        </button>
    )
}

export default Button;
