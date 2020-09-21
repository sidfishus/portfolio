
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Container, Segment, Label } from "semantic-ui-react";
import { HEADING_COLOUR } from "../../theme";
import { Link } from "react-router-dom";

interface IHomeProps extends IRoutedCompProps {
};

//sidtodo catalog of my favourite tunes.

//sidtodo: create a short video?

//topics:
//  purpose of site: catalog my work, demonstrate my skills, experience, give a flavour in to who i am
//      covers my work from approx 2017 onwards.
//  can see the power and future of software, everything is going to become an app
//  feel free to request a copy of my cv..
//  explain tech used to create the site, where the code can be found
//  about me
//  background
//  how i got in to coding
//  current and future projects: social media app using Material UI, cryptocurrency. like to do more on unit testing and writing functional code. brilliant concept
//  coding preferences, backend, full stack, prefer to use UI library
//  versatility, ability to learn on the fly
//  professional experience, cv furlough giving me time to finish
//  what the site offers: live React app e.t.c.

// links section

// work in spare time

//  financially viable but also rewarding and puts me to the test, has an impact on the world around me

//sidtodo page for my live mixes!

export const Home: React.SFC<IHomeProps> = (props) => {
    return (
        <>
            <Container>
                <Segment padded>
                    <Label color={HEADING_COLOUR} attached="top" content="Welcome" />
                    {welcome}
                </Segment>
            </Container>
        </>
    );
};

//sidtodo <p>I am currently pursueing anything that is both financially viable (there are bills to pay unfortunately) but also rewarding and has an impact on the world around me</p>

const welcome: JSX.Element = (
    <>
        <h1>Introduction</h1>
        <p>Hello and welcome to my cloud based portfolio!
            I trust your journey was not a stressful one.
        </p>
        <p>
            My name is Chris Siddall, I am currently the fine age of 35 years old (1985) and based in Tamworth Staffordshire.
            I have had a passion for coding since discovering it at the age of 16, and have created this application as a means of demonstrating my skills, to catalog my work and experience and to give further insight into my personality.
            It is not my intention to sound overly professional or formal because I want to express who I am.
        </p>
        <p>
            Before the COVID quarantine in March 2019 my work on this was limited to the odd spare 15 minutes I could find.
            However being furloughed for 6 weeks gave me the wonderful opportunity to knuckle down and really put some time in.
            It was then that I completed the majority of the <Link to="./textparse">text parse user interface</Link>, and what remained was writing everything up.
        </p>
        <h1>About Me</h1>
        <p>I am a proud father to my 6 year old son and believe this has had a very positive effect on my outlook towards life.
            My father has moulded me in to the person I am today so I am hoping to replicate that with my son.
            Arthur if you are reading this, your father loves you very much.
        </p>
        <p>I have always been physically active and have done many sports in my youth including kickboxing, boxing, rugby, cricket, football and even gymnastics.
            Kickboxing is the sport I took most seriously which I did between the ages of 7 and 18, had 10 amateur fights including a British title bout (I lost) and even helped teach women and children's classes.
            I now rigorously exercise for over 1 hour almost every day because it has a wonderful effect on my physical and mental health and acts as a natural stimulant.
        </p>
        <p>Besides computer programming, I have been an obsessive carp fisherman since the age of 7 and lovingly fish in all weather conditions.
            In my early to mid 20's I was heavily into frequenting live music events such as raves, clubbing and festivals and my favourite genre's are trance, hard house/dance, drum and bass, and UK hardcore.
            I have been to Glastonbury 4 times.
            I learned to mix my favourite categories of music using CDJ's and played out approximately 10 times at small to medium club events.
            Those days are behind me now but I am still very passionate about music due to it's wonderful natural stimulating effects.
            Since becoming a father balancing my life has become even more important as I carefully manage work, family and my home as well as squeezing in time to follow my dreams.
            Lately I'm finding myself more and more interested in politics and have been following the COVID19 crisis and American rioting very closely.
        </p>

        <p>I do believe there is such a thing as too much technology and think it's de-sensitising us to the world around us</p>

        <p>hobbies / beliefs</p>
        <p>personality / confidence / drive / obsession / focus / quirky / introverted and extroverted / (ego to an extent) / brutally honest</p>
        <p>not very good at summarising and may come across long winded</p>
        <p>negatives: can get anxious new surroundings</p>

        <h1>Beginnings</h1>

        <h1>About Me</h1>
    </>
);