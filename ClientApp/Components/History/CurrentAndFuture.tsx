
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo } from "../Presentation";

export interface ICurrentAndFutureProps {
};

export const CurrentAndFuture: React.FunctionComponent<ICurrentAndFutureProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <CurrentAndFutureSection />
        </ContainerDemo>
    );
};

const CurrentAndFutureSection: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Current and Future">
            <p>I've created 3 React and ASP .NET MVC applications, I develop and support another professionally, and I'm in the middle of creating another.</p>

            <p>I was aware of the importance and power of software from the very beginning and understand that demand for competent programmers will continue to increase.
            </p>

            <p>The world is currently going through a digital transformation and I believe in the future there will be applications to do almost every aspect of human life.
                I have 2 good ideas for applications.
                I am currently working on a social media web application again using React and ASP .NET, and Material UI, which huge potential which I plan to host in Azure on a low quota when I have a working version and get friends and friends of friends to try it out.
                If it is well received then I plan to look in to getting financial backing to help me expand and bring it to the masses.
            </p>

            <p>I do believe there is such a thing as too much technology and think it's de-sensitising us to the world around us</p>

            <p>I am currently pursueing anything that is both financially viable (there are bills to pay unfortunately) but also rewarding and has an impact on the world around me
            </p>

            <p>Find cryptocurrency interesting and potentially write an application that uses a crypto API like Coinbase Pro
                to spot trends and buy/sell at the write time.
            </p>

            <p>I would like to focus more on functional programming, unit tests and test driven development</p>
        </SegmentDemo>
    );
};