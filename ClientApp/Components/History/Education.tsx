
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo } from "../Presentation";

export interface IEducationProps {
};

//sidtodo school and sixth form
export const Education: React.FunctionComponent<IEducationProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <ComputingBSc />
        </ContainerDemo>
    );
};

const ComputingBSc: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Computing BSc">
            <p>From the moment I started scripting on MSN Chat I knew this was what I wanted to do as a career.
            </p>
            <p>
                Prior to this I was studying a variety of subjects at A level in sixth form without any real idea of what I wanted to do.
                I didn't really get much out of this part of my education but achieved the results required to get on to a computing undergraduate course at my local university (Coventry).
            </p>
            <p>
                I instantly made some very close friends and had many social occasions throughout my 3 year stint, we have a ritual where we meet up every year on the last Saturday of January in Coventry.
                In terms of programming university did not teach me very much, I was doing 'get' and 'set' methods in Java at university when in my spare time I was creating complex Win32 applications in C++.
                But it give me more of an overview and broader understanding of how the various aspects of computers work, which as much as anything just helped give me more context.
                I found the computer architecture courses particularily enjoyable.
            </p>
            <p>
                For my final year project I picked one of the university's examples which was to program a strategy for a <a href="https://www.youtube.com/watch?v=3OWYOatzJZE">robotic soccer team</a>.
                This consisted of creating a Windows C++ DLL with a number of exported functions that would be called/hooked by the robot soccer engine.
                In particular you had a function that was executed like a frame in a computer game.
                In this function you would receive the current position of the ball and positions of all of the players and you could assign a speed value to each wheel of each of your team players to control their movement.
                I created an array that would log the ball positions over each frame, and use this to predict the direction and speed of where it was going so I could try to intercept it.
                I assigned a strategy to each player as per a soccer game.
                The goalie's job was to stay within the box and block the ball.
                2 defenders who would stay within the final third of the pitch in their designated side and attempt to block the ball and move towards the ball with the angle necessary to direct the ball towards the goal by using trigonometry calculations.
                2 attackers who would move towards the ball with the correct angle to direct it towards the goal when it was in the center or the opposition's side of the pitch.
                //sidtodo upload the soccer strategy
            </p>
        </SegmentDemo>
    );
};