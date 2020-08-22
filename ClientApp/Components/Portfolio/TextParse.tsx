
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg } from "./PortfolioBase";

export interface ITextParsePortfolioProps extends IRoutedCompProps {
};

//sidtodo change heading??
export const TextParsePortfolio: React.SFC<ITextParsePortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            about={About()}
            aboutHeading="Text Parse"
            carouselImgs={carouselImgs}
        />
    );
};

const carouselImgs : ICarouselImg[] = [
    {
        src: "/img/textparse/palindromeexample.jpg",
        text: "Example which determines whether a word is a palindrome."
    },

    {
        src: "/img/textparse/extractpalindromeexample.jpg",
        text: "Example which extracts the words which are palindromes."
    },

    {
        src: "/img/textparse/captureextractexample.jpg",
        text: "Example which extracts values using a replace format."
    },

    {
        src: "/img/textparse/replaceparenexample.jpg",
        text: "Example which converts VB script to VB .NET (function calls)."
    },

    {
        src: "/img/textparse/statementtypes.jpg",
        text: "List of statement types (subset available in the UI)."
    },

    {
        src: "/img/textparse/customfunction1.jpg",
        text: "Custom function creation."
    },

    {
        src: "/img/textparse/customfunction2.jpg",
        text: "Custom functions and custom variable creation."
    },

    {
        src: "/img/textparse/customfunction3.jpg",
        text: "Custom functions and custom variables."
    },

    {
        src: "/img/textparse/customfunction4.jpg",
        text: "Custom functions and custom variables."
    },

    {
        src: "/img/textparse/customfunction5.jpg",
        text: "Custom functions and custom variables."
    },

    {
        src: "/img/textparse/userdefinedvariables.jpg",
        text: "User defined variables."
    },

    {
        src: "/img/textparse/customcomparison1.jpg",
        text: "Custom comparisons."
    },

    {
        src: "/img/textparse/customcomparison2.jpg",
        text: "Custom comparisons."
    },

    {
        src: "/img/textparse/customcomparison3.jpg",
        text: "Custom comparisons."
    },

    {
        src: "/img/textparse/customcomparison4.jpg",
        text: "Custom comparisons."
    },

    {
        src: "/img/textparse/customcomparison5.jpg",
        text: "Custom comparisons."
    },
];

//sidtodo finish
// created to perform classic ASP to ASP .NET conversion
// created a UI to demonstrate
const About: any = () => {
    return (
        <>
            <p>test</p>
        </>
    );
};