
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo } from "../Presentation";
import { CalcDurationYears } from "../../Library/DateTime";

export interface IAboutMeProps {
};

//TODO about me section include pictures - family and fishing, kickboxing
export const AboutMe: React.FunctionComponent<IAboutMeProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <AboutMeSection />
            <Hobbies />
        </ContainerDemo>
    );
};

//TODO attach my personality chart
const AboutMeSection: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="About Me">
            <p>I am a devoted father to my {CalcDurationYears("2014-02-16")} year old son and this has had a very positive effect on my attitude towards life.
                My father has had a significant influence on my personality (thankyou) and I owe a lot to him,
                and I am hoping to replicate this with my son. Arthur if you are reading this, your father loves you very much.
            </p>
            <p>The importance of being physically active has been hammered home by my father from an early age.
                I did many sports in my youth including kickboxing, boxing, rugby,
                cricket, football and even gymnastics.
                Out of these I took kickboxing the most seriously for which I did between the ages of 7 and 18 for Don's Gym in
                Coventry,
                had 10 amateur fights including a British title bout (I lost) and even helped teach women and children's classes.
                When my interest in sports dipped around the age of 18 physical activity was replaced by going to raves where
                I could dance for up to 12 hours at a time fueled by the music and atmosphere, alcohol, Red Bull and Pro Plus
                caffeine tablets!
                I now rigorously exercise for 1 hour a day most days and combined with a good diet I strive to live past 100.
            </p>
            <p>
                I am naturally an introvert, content in solitude, but I appreciate the value of family and human
                connection and the necessity of working with others.
                If my mood or the atmosphere takes me I can become very extrovert,
                I generally adapt my personality to best suit the situation and group dynamics.
                I pride myself on being labeled a geek and consider myself a confident and creative deep outside of the
                box thinker who takes a fresh and direct approach to solving problems and I get a buzz out of this.
                I aim to be organised and focus my attention on one thing at a time, I actively strive to not multi task.
                I have proved myself to work well under pressure but I believe time constraints kill creativity!
            </p>
            <p>
                To honestly sum myself up I would say I'm a critical free thinker, confident, driven,
                motivated, adaptable and quick to learn, direct, meticulous, and obsessive.
            </p>
            
            <p>In my opinion my biggest asset as a programmer is my lengthy and varied experience which I feel gives me the
                almost natural ability to be versatile and learn and apply new concepts, languages and frameworks on the fly.
                For example with there being such a proliferation of web development technologies currently, being fluent
                in one or a few but being constrained to only those restricts your usefulness as a programmer.
                By the time you read this
                a significant amount of the third party code used to produce this site will be obsolete or deprecated,
                for example I started using .NET Core MVC version 2, upgraded to version 3 and now version 5 is out.
                I believe that unless you have a photographic memory it's not feasible to be expected to remember the low
                level details of N number of technologies in order to be effective.
                Having a "can do" and "never give up" type attitude is a prerequisite for being a successful programmer
                when each project you work on incorporates at least one significant technology which is new to you.
            </p>
            <p>
                I consider myself a full stack developer but I have a definite preference and strength for
                creative software design and backend development.
                I prefer to
                reuse a ready built user interface platform like Semantic UI React which I have used in this site
                instead of spending valuable time making trivial presentation changes. That's just my opinion.
            </p>
            <p>If I could change anything about myself it would be to remove my need for sleep and rest.
                There is so much that I would like to pursue but unfortunately I cannot do it all at the moment.
                I try to find a healthy balance between work, family, my friends, my hobbies, managing my house,
                and my physical and mental health, whilst trying not to forget to smell the roses along the way.
            </p>
        </SegmentDemo>
    );
};

const Hobbies: React.FunctionComponent<{}> = () => {
    return (
        <SegmentDemo heading="Hobbies">
            <p>Besides computer programming, I have been an obsessive carp fisherman since the age of 7 and passionately fish in all weather conditions.
                My current personal best carp is a 42lb common known as "The Mosaic" from my syndicate lake in Bromsgrove.
                I also have an interest in the science of carp bait formulation and have been producing my own bait
                and lures for approximately {CalcDurationYears("2010-01-01")} years.
            </p>
            <p>
                "From as far back as I can remember" I have been an avid listener of dance music.
                Coding whilst listening to tunes puts me in a happy place!
                In my early to mid 20's I was heavily into live music events such as raves, club events and festivals and my favourite genre's are trance, hard house/dance, drum and bass, and UK hardcore.
                Around this time I learned to mix my favourite categories of music using CDJ's (CD version of vinyl) and played out approximately 10 times at small to medium club events.
                I have been to Glastonbury 4 times which is something everyone should experience at least once.
                Those days are behind me now but I am still very passionate about music due to it's wonderful natural stimulating effects and will occasionally dust off the decks and smash them up.
            </p>
            <p>
                Whereas in the past I read a lot of books such as fishing novels and A Song of Ice and Fire, and watched Netflix movies and TV series,
                I now spend a lot of that time listening to pod casts. There is such a variety of free to download audio content available and
                there are many subjects that I am passionate about.
                I have recently started to invest in and research cryptocurrency and blockchain technologies and is a
                sector I would like to work in, I
                believe it is going to be revolutionary in the next 50 years.
            </p>
        </SegmentDemo>
    );
};