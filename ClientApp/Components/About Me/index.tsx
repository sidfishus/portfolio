
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo } from "../Presentation";

export interface IAboutMeProps {
};

//sidtodo about me section include pictures - family and fishing, kickboxing
export const AboutMe: React.FunctionComponent<IAboutMeProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <AboutMeSection />
            <Hobbies />
        </ContainerDemo>
    );
};

//sidtodo attach my personality chart
const AboutMeSection: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="About Me">
            <p>I am a devoted father to my 6 year old son and this has has a very positive effect on my attitude towards life.
                My father has had a significant influence on my personality (thankyou) and I owe a lot to him,
                and I am hoping to replicate this with my son. Arthur if you are reading this, your father loves you very much.
            </p>
            <p>The importance of being physically active has been hammered home by my father from an early age.
                I did many sports in my youth including kickboxing, boxing, rugby,
                cricket, football and even gymnastics.
                Out of these I took kickboxing the most seriously for which I did between the ages of 7 and 18 for Don's Gym in
                Coventry,
                had 10 amateur fights including a British title bout (I lost) and even helped teach women and children's classes.
                When I lost interest in sports around the age of 18 physical activity was replaced by going to raves where
                I could dance for up to 12 hours at a time fueled by the music and atmosphere, alcohol, Red Bull and Pro Plus
                caffeine tablets!
                I now rigorously exercise for over 1 hour 6 days a week and combined with a good diet I strive to live past 100.
            </p>
            <p>
                I am naturally an introvert, content in solitude, but I appreciate the value of family and human
                connection and the necessity to work with others.
                If my mood or the surroundings take me, or if I am surrounded by introverts then I can become more extrovert.
                I pride myself on being labeled a geek and consider myself a very confident and creative deep outside of the
                box thinker who takes a fresh and direct approach to solving problems and I get a buzz out of this.
                I aim to be organised and focus my attention on one thing at a time, I actively strive not to multi task.
                I have proved myself to work well under pressure but I believe time constraints kill creativity!
            </p>
            <p>
                To honestly sum myself up I would say I'm a critical free thinker, confident, driven,
                motivated, versatile and quick to learn, meticulous to the point of appearing pedantic, and obsessive.
                I can be cold, serious and almost robotic at times because I try to apply a methodical approach to
                everything, not just software and problem solving.
            </p>
            <p>//sidtodo here.
                Weaknesses that I am working on are new surroundings, situations and meeting new people can make me anxious.
                Programming has always felt natural, but social interaction is not at times and is something I reflect on.
                If I had to choose between working with software or humans, I would choose
                software because it is far simpler to understand (especially than the opposite sex) and follows fixed rules!
                I feel uncomfortable when I have to be spontaneous and I find it easier to express myself and explain technical
                things through writing and diagrams rather than through speech.
                I show leadership qualities such as taking charge and leading by example but I'm not sure if I would
                consider myself a leader because I have high expectations and need to work on getting the best
                out of people.
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
            //sidtodo here.
            <p>
                I consider myself a full stack developer but I have a definite preference and strength for
                creative software design and backend development.
                I am better placed being concerned with how things work as opposed to nuances in the user interface.
                Of the widely used web technologies I have the least experience in CSS and LESS because I prefer to
                reuse a ready built user interface platform like Semantic UI React that I have used in this site
                instead of spending valuable time making trvial changes by fiddling with CSS. That's just my opinion.
            </p>
            <p>If I could change anything about myself it would be to remove my need for sleep and rest.
                There is so much that I would like to do but unfortunately I cannot do it all at the moment.
                I have to find the correct balance between work, family, my friends, my hobbies, managing my house,
                and my physical and mental health, whilst trying not to forget to smell the roses along the way.
            </p>
        </SegmentDemo>
    );
};

const Hobbies: React.FunctionComponent<{}> = () => {
    return (
        <SegmentDemo heading="Hobbies">
            <p>Besides computer programming, I have been an obsessive carp fisherman since the age of 7 and lovingly fish in all weather conditions.</p>
            <p>
                In my early to mid 20's I was heavily into frequenting live music events such as raves, clubbing and festivals and my favourite genre's are trance, hard house/dance, drum and bass, and UK hardcore.
                I have been to Glastonbury 4 times.
                I learned to mix my favourite categories of music using CDJ's and played out approximately 10 times at small to medium club events.
            </p>
            <p>
                Those days are behind me now but I am still very passionate about music due to it's wonderful natural stimulating effects and will occasionally dust off the decks.
                Since becoming a father balancing my life has become even more important as I carefully manage work, family and my home as well as squeezing in time to follow my dreams.
                Lately I'm finding myself more and more interested in politics and have been following the COVID19 crisis and riots in America closely.
            </p>
        </SegmentDemo>
    );
};