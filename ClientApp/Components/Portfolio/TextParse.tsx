
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg } from "./PortfolioBase";

export interface ITextParsePortfolioProps extends IRoutedCompProps {
};

export const TextParsePortfolio: React.SFC<ITextParsePortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            about={About()}
            aboutHeading="House Construction Health and Safety Web System (CAIRS)"
            carouselImgs={carouselImgs}
        />
    );
};

//todo show example for variables
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