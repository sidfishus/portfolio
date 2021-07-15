
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo, Code } from "../Presentation";
import { Link } from "react-router-dom";

export interface IEducationProps {
};

export const Education: React.FunctionComponent<IEducationProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <ComputingBSc />
        </ContainerDemo>
    );
};

const ComputingBSc: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Computing BSc - Coventry University 2003-2006">
            <p>From the moment I started scripting on
                <Link to="/history/frivolousbeginnings"> MSN Chat</Link> I knew programming was what I wanted to do as a
                career. I was loving doing it as a hobbie but earning a living from it would be the holy grail.
            </p>
            <p>
                At the time I was studying a variety of subjects at A level in sixth form without any real idea of what I wanted to do.
                I didn't take much out of this part of my education but it was the catalyst for me stumbling across programming
                and I spent a lot of the time that I should be studying either fishing, reading or writing code.
                I was not motivated by my sixth form subjects but achieved the results necessary to secure a place on a
                computing undergraduate course at my local university (Coventry).
            </p>
            <p>
                I instantly became part of a close friendship group and we had many social occasions (usually involving the
                pub) throughout my 3 year stint. We are still all very close today and we regularly meet up, for
                example we have a ritual where we all meet up on the last Saturday of January in Coventry.
                However with COVID19 this has now changed to be a virtual event!
                It was very beneficial to have such close friends as they were a constant source of companionship and
                advice.
            </p>
            <p>
                In terms of programming, university did not teach me very much. I was being taught 'get' and 'set'
                methods in my Java module when in my spare time I was creating complex Win32 GUI applications in C++
                and replicating the MSN Chat authentication algorithm for 'OCXless' connection to the service.
                I did do some cool programming modules however, such as C programming on Unix where we had remote access
                to the University Unix server which had the GCC compiler installed and permission to execute
                applications compiled on there.
                I used programming as the solution to as much of the work as possible.
                For example, for one of my group projects
                we designed a tracking device that could be used to secure expensive items, and I created
                an application in Visual Basic to demonstrate the concept.
            </p>
            <p>
                I did gain a broader understanding of the internet and computers in general.
                I learned a lot about computer architecture and the various hardware components as well as
                how to create a network, and how computer programs are read in to memory from the hard-disk
                and executed as a stack of instructions by the CPU.
                I also gained the valuable knowlege of the different number systems and why they were used
                (i.e. binary and hexadecimal). This included a piece of coursework to create a program
                as an Excel macro in Visual Basic to convert a number from a given number system/base to a different
                number system.
            </p>

            <p>
                University gave me a lot of spare time!
                This meant I was able to do lots of hands on programming for my own projects (MSN Chat e.t.c.),
                as well as fishing where I could camp for up to a week at a time and spend most of it reading
                books related to programming or just generally thinking about programming, and also the
                opportunity to do a bit of part time work which would pay for my social events.
            </p>

            <p>
                For my final year project I chose to do one of the university's project examples which was to program
                a AI strategy for a physical <a href="https://www.youtube.com/watch?v=3OWYOatzJZE">robotic soccer team </a>
                which is an internationally played sport.
                Each team consisted of 5 players, and the players are essentially a cube with 2 wheels that are
                given instructions by the strategy computer program and executed by the robot soccer engine.
                The strategy itself was a Windows C++ DLL containing a number of exported functions that
                were called/hooked by the robot soccer engine.
            </p>
            <p>
                In particular there is a function that is called on a schedule that works in a similar way
                to the frame function in a computer game.
                The parameters to this function were the current position of the ball as well as the positions of all
                the players, and you would use this information to determine your strategy.
                As an action within this function you could assign a speed value to both wheels of each of your team
                players to control their direction and speed.
                I used trigonometry to determine the angle necessary to move to the desired position and translated
                this in to a speed value for each
                wheel. E.g. a speed value of 0.5 for the left wheel and 1.0 on the right wheel meant the robot
                would travel at full speed in a direction of 10.30pm on a clock or a 315° angle in other words.
                To predict the future positions of the ball I created an array that logged the ball positions per frame
                and from this I could determine the direction and speed it was travelling and whether it was speeding up
                or slowing down.
                I am not really a football enthusiast and have little understanding of football strategy but my idea
                was to assign each of the 5 players a different role and strategy, like you would in an actual
                football game.
                The goalie's job was to stay in the goal area and simply block the ball by placing itself in a central
                location between where the ball was travelling and the goal.
                Each defender was assigned a side of the pitch and would move to a position to block the ball whenever
                it was in a certain area.
                The attackers however continually run towards the ball at an angle that upon contact directs it toward
                the centre of the oppositions goal.
                I've uploaded the code for the strategy <a href="https://github.com/sidfishus/RobotSoccerStrategy">
                    here</a> and the functions of note are
                <Code inline={true}>'void RobotSoccerStrategy::defendGoal'</Code> ,
                <Code inline={true}> 'void RobotSoccerStrategy::defend()'</Code>, and
                <Code inline={true}> 'void RobotSoccerStrategy::attack()'</Code>.
            </p>

            <p>In June 2006 I graduated with a second class batchelors degree with honours.</p>
        </SegmentDemo>
    );
};