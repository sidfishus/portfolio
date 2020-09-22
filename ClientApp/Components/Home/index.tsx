
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
// educational game to explain programming to children

// Javascript and transpilation is very much a bit of me. i first heard of this concept when I read a book by .. about the Eiffel OO programming language that is transpiled in to C.
// would like to design my own programming language that works in a similar fashion though i'm not sure if the produced code would be something static like C, or dynamic like javascript.

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
            I have had a passion for coding since discovering it at the age of 16, and have created this application as a means of demonstrating my skills, to catalog my life's work and experience and to give further insight into my personality.
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
        <p>
            I am naturally an introvert, content to be on my own but I appreciate the value of family and working with others.
            Depending on my mood and the surroundings I switch to an extrovert and crave interaction.
            Proud to be called a geek and I like to consider myself a deep outside of the box thinker, I love the extreme level of focus you can achieve when mapping out a scenario in your head.
            I enjoy solving problems which is the essence of programming, I need to be mentally stimulated otherwise I can become disinterested.
        </p>
        <p>
            If I had to sum myself up without embellishing too much I would say I'm a free thinker, confident, driven, motivated, versatile and quick to learn, meticulous to the point of appearing pedantic, and obsessive which is both positive and negative.
        </p>
        <p>
            Negatives and aspects I am working on are new surroundings and situations can make me anxious and I can be brutally honest.
            I find it difficult to summarise as this portfolio probably attests to.
            Programming has always felt natural to me, but I always have to conscious and reflect upon how I interact and converse with people.
            In my opinion computer code is far simpler to work with than humans, especially the opposite sex!
        </p>

        <h1>Thoughts Towards Programming</h1>
        <p>
            For 15 years I was a C++ stalwart, being mentored and inspired by some very intelligent and experienced C++ coders whilst at Prophet.
            This taught me the importance of being meticulous, and writing careful and resilient code which is an integral system in a production environment.
            At the time we were very fixated on having as much of the code statically analysable as possible, to allow the compiler to pick up C++ style bugs and maximise efficiency.
            Forgetting to deallocate memory in C/C++ is easy to do unless you write code in such a way, and can, and has, literally cost lives.
            I can't find a reference to it via search engines, but I was told a story where a key hospital system was offline due to a memory leak.
            I know of applications that have to be restarted multiple times per day due to long standing unfixed memory leaks.
        </p>
        <p>
            As time passes by, and with finding myself having less time, and with computer processing power continually increasing, I am more pragmatic.
            I consider the ultimate goal of programming to be delivering the use cases as accurately as possible, as opposed to being precious about the code //sidtodo change.
            Don't misunderstand me, I appreciate imaginative, well designed and quality code, but it must always be secondary to the finished product.
        </p>

        <p>
            very much influenced by Bertrand Meyer and his Eiffel programming language and his fascination for underscores (much to the annoyane of my manager at the time!)
        </p>

        <p>as time passees, and with finding myself having less time, and computer processing power forever increasing I consider myself more pragmatic, with the final product/outcome being the most important factor as opposed to fixating on the nuances of the actual code.
            the code is not the end result

            with readability being a more important factor than efficiency most of the time.

            80% 20% rule.
        </p>

        <p>It is very interesting to see the way the open source community is flourishing.
            For example I would never have imagined that Microsoft would begin releasing code like they have with their Roslyn compiler and their ASP .NET MVC Core libraries.
            The abundance of freely available code has allowed me to create this web site without having to reinvent the wheel and it feels like we are working together to share a better future.
            If you removed the content, I imagine that less than 10% (very rough guess) of the codebase in this application is actually my own.
            I hope this trend continues!
        </p>

        <p> .NET is brilliant - love the concept of interim/byte code and JIT so that code is portable. </p>

        <p>so many free libraries that I a make use of this in this site. not reinventing the wheel, and working together building a better future. i hope it continues</p>




        <p>attention to detail to the point of appearing pedantic. obsessive which is a double edged sword</p>

        <p>programming is natural to me but I have to always consider how I interact with others </p>

        <p>versatility</p>


        <p>hobbies / beliefs</p>
        <p>personality / problem solver / confidence / drive / obsession / focus / quirky / introverted and extroverted / (ego to an extent) / brutally honest</p>
        <p>not very good at summarising and may come across long winded</p>
        <p>negatives: can get anxious new surroundings, don't like to multi task</p>

        <p>I do believe there is such a thing as too much technology and think it's de-sensitising us to the world around us</p>

        

        <h1>Hobbies</h1>
        <p>Besides computer programming, I have been an obsessive carp fisherman since the age of 7 and lovingly fish in all weather conditions.
        <p>
            In my early to mid 20's I was heavily into frequenting live music events such as raves, clubbing and festivals and my favourite genre's are trance, hard house/dance, drum and bass, and UK hardcore.
            I have been to Glastonbury 4 times.
            I learned to mix my favourite categories of music using CDJ's and played out approximately 10 times at small to medium club events.
        </p>
        <p>
            Those days are behind me now but I am still very passionate about music due to it's wonderful natural stimulating effects and will occasionally dust off the decks.
            Since becoming a father balancing my life has become even more important as I carefully manage work, family and my home as well as squeezing in time to follow my dreams.
            Lately I'm finding myself more and more interested in politics and have been following the COVID19 crisis and American rioting very closely.
        </p>

        

       

        <h1>Beginnings</h1>
    </>
);