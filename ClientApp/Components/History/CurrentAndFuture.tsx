
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
            <p>
                From an early age I was lucky enough to grasp the importance of software in the present and
                future and that therefore demand for competent programmers was only going to increase over time.
                15 years later in 2021 this continues to be true.
            </p>

            <p>I'm now in a position where I have many years of solid programming experience under my belt.
                I have a deep understanding of C++ and SQL and have successfully made the transition
                to .NET and web based technologies.
                I also believe I have the confidence, maturity and resilience to thrive in most programming
                roles.
                I am somewhat frustrated that I have not achieved more because I know I have the
                imagination and skills to do so. But I feel I am at the point in my life where I want to,
                and are ready to progress to the next stage.
            </p>

            <p>The world is currently on the cusp of a digital explosion. If you consider the technologies we have
                available versus the systems which we actually use in our daily lives, I feel we are decades
                behind. Ideas such as blockchain and decentralization are more than just a technology,
                they are a great shift in mindset and challenge and strive
                to greatly improve every aspect of society and human life. For example if you listen to
                Charles Hoskinson discuss the ethos and concepts behind Cardano, his vision for the future
                is revolutionary
                (<a href="https://www.youtube.com/watch?v=FKh8hjJNhWc">here's his podcast with Lex Fridman</a>).
                I find this very inspiring but I'm not sure if I'm naive in thinking it's likely to see
                such grand changes in my lifetime.
            </p>

            <p>
                Currently my biggest motivation for seeking employment is to earn a living unfortunately.
                However I'm very passionate about blockchain and cryptocurrency. In terms of work satisfaction
                these are the industries I would most likely to work in.
                I would love to work on project(s) related to Cardano, Ethereum, Chainlink, Algorand or any of the
                other leading blockchain technologies because the ideas and principles
                resonate with me on a programming level, as well as the major impact I believe they are going to have
                on human life in the future.
                Other industries I would particularily like to work in are fishing, music, health food and supplements,
                and computer games due to them being other interests of mine.
            </p>
            <p>
                I am pursueing both permanent and contract roles, and where possible I would like to
                work at least part time remotely due to the flexibility this offers and to minimise travel and
                maximise time with my family. I've been working from home since the original lockdown and now spend
                the time I would usually be travelling devoted to exercise instead.
            </p>

            <p>
                I have many ideas for digital applications, I just wish I had the time and resources to explore them.
                For example at the time of writing I have begun to create a social media application which has great
                potential but I'm not sure
                when or if I will have the time to work on it enough to complete an initial version.
            </p>

            <p>
                In terms of programming and technologies that I would like to pursue outside of what I am already using,
                typically I write code in what I feel is a pragmatic fashion and use a mixture of paradigms in my code
                but I would be interested in working on software which was strictly functional only.
                <a href="https://www.haskell.org/"> Haskell</a> is a purely functional programming language that I would
                like to explore, and my interest is further sparked due to the fact a lot of the
                Cardano codebase is Haskell and Haskell was expanded to scale with Cardano.
                I would also be interested in working on projects that formally use unit testing and test driven
                development.
            </p>
        </SegmentDemo>
    );
};