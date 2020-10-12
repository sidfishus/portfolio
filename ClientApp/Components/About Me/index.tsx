
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

const AboutMeSection: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="About Me">
            <p>I am a devoted father to my 6 year old son and this has has a very positive effect on my attitude towards life.
                My father moulded me to be the person I am today and I am hoping to replicate that with my son.
                Arthur if you are reading this, your father loves you very much.
            </p>
            <p>I have always been physically active and have done many sports in my youth including kickboxing, boxing, rugby,
                cricket, football and even gymnastics.
                Out of these I took kickboxing the most seriously for which I did between the ages of 7 and 18 for Don's Gym in Coventry,
                had 10 amateur fights including a British title bout (I lost) and even helped teach women and children's classes.
                When I lost interest in sports around the age of 18 my physical activity was replaced with going to raves where
                I could dance for 12 hours of a time fueled on alcohol, Red Bull and Pro Plus caffeine tablets!
                I now rigorously exercise for over 1 hour almost every day because it has a wonderful effect on my physical
                and mental health and with a good diet I strive to live past 100.
            </p>
            <p>
                I am naturally an introvert, content to be on my own but I appreciate the value of family and human connection
                and the necessity to work with others.
                If my mood and the surroundings take me I become an extrovert and crave interaction.
                I pride myself on being called a geek and consider myself a very confident and creative deep outside of the
                box thinker who takes a fresh and direct approach to solving problems for which I get a buzz from.
                I like to be organised and focus my attention on one thing at a time.
                I have proved myself to work well under pressure but I believe time constraints kill creativity!
            </p>
            <p>
                To sum myself up without embellishing too much I would say I'm a critical free thinker, confident, driven,
                motivated, versatile and quick to learn, meticulous to the point of appearing pedantic, and obsessive which can be
                both positive and negative.
            </p>
            <p>
                Weaknesses that I am working on are new surroundings, situations and meeting new people can make me anxious.
                Programming has always felt natural, but social interaction at times isn't, so I am conscious of and have to
                reflect on this.
                In my opinion computer code is far simpler to understand than humans, especially the opposite sex!
                I feel uncomfortable when I have to be spontaneous and I find it easier to express myself and explain technical
                things through writing and diagrams rather than through speech.
            </p>
            //sidtodo here.
            <p>In my opinion my biggest asset as a programmer is my lengthy and varied experience which I feel gives me the natural ability to be versatile and pick up and apply new concepts, languages and frameworks on the fly.
                With web development currently exploding for example, it is more important to be full-stack and versatile as opposed to being an expert in a single thing.
                Especially when every month there are a number of new libraries or updates to use and by the time you read this no doubt some of the third party code is now obsolete or deprecated.
                Unless you have a photographic memory it's not feasible to remember low level details of X number of programming languages, platforms, libraries.
                I consider myself a full stack developer now but I have a definite preference for the backend.
                I'm better placed being concerned with how things work as opposed to how it looks.
                My least understood of the web technologies is CSS and LESS, and I would rather just go with a ready built user interface platform like Bootstrap, Semantic UI, or Material UI (the 3 I have used).
            </p>
            <p>If I could change anything about myself it would be to remove my need for sleep.
                I have lots of ideas but there just isn't enough time in the day and I have to strike the correct balance.
            </p>
            <p>I work best when I am on my own and it is quiet</p>
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