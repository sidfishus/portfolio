
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



// links section

// work in spare time

//  financially viable but also rewarding and puts me to the test, has an impact on the world around me

//sidtodo page for my live mixes!

export const Home: React.SFC<IHomeProps> = (props) => {
    return (
        <>
            <Container>
                <Segment padded>
                    <Label color={HEADING_COLOUR} attached="top" content={"printf(\"Hello, World!\");"} />
                    {welcome}
                </Segment>
            </Container>
        </>
    );
};

//sidtodo <p>I am currently pursueing anything that is both financially viable (there are bills to pay unfortunately) but also rewarding and has an impact on the world around me</p>

//const welcome= <>test</>;

const welcome: JSX.Element = (
    <>
        <h1>Introduction</h1>
        <p>Hello and welcome to my cloud based portfolio!
            I trust your journey was not a stressful one.
        </p>
        <p>
            My name is Chris Siddall, I am currently the fine age of 35 years old (1985) and based in Tamworth Staffordshire.
            I have had a passion for coding since discovering it at the age of 16, and have created this application as a means of demonstrating my skills, to catalog my life's work and experience and to give further insight into my personality.
            It is not my intention to sound overly professional or formal because I want this to be about expressing myself.
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
        <p>In my opinion my biggest asset as a programmer is my lengthy and varied experience which I feel gives me the natural ability to be versatile and pick up and apply new concepts, languages and frameworks on the fly.
            With web development currently exploding for example, it is more important to be full-stack and versatile as opposed to being an expert in a single thing.
            Especially when every month there are a number of new libraries or updates to use and by the time you read this no doubt some of the third party code is now obsolete or deprecated.
        </p>

        <h1>Thoughts Towards Programming</h1>
        <h2>C++</h2>
        <p>
            For 15 years I was a C++ stalwart, being mentored and inspired by some very intelligent and experienced C++ coders whilst working for Prophet and this experience was invaluable.
            This taught me the importance of being meticulous, and writing careful and resilient code which is robust enough to run in a production environment.
            At the time we were very fixated on having as much of the code statically analysable as possible (like for example using MS SAL Annotations), to allow the compiler to pick up C++ style bugs and maximise efficiency.
            I understand the inner workings of C++ more so than any other language, there is not much you cannot achieve when you combine it's OO design and templates.
            However I believe the amount of flexibility you have comes at a cost in terms of readability, development time, loss of sight of the bigger picture, and potential for bugs.
            Plus there are less developers out there who actually competent in the language (pointers put a lot of people off!).
            The <a href="https://en.cppreference.com/w/cpp/utility/functional/placeholders">STL syntax</a> at times is very awkard, which in this case definitely results in the loss of readability for the sake of efficiency.
            And that is quite a simple example.
            Forgetting to deallocate memory in C/C++ is easy to do unless you write code in such a way, and can, and has, literally cost lives.
            I can't find a reference to it via search engines, but I was told a story where a key hospital system was offline due to a memory leak.
            I know of applications that have to be restarted multiple times per day due to long standing unfixed memory leaks!
            I would definitely recommend that new developers learn a language like C or C++ early on.            
            Higher level languages, and with the inventation of garbage collection can make you complacent or lazy and can take away your understanding of how a program actually executes.
        </p>

        <h2>.NET and C#</h2>
        <p> .NET and C# are brilliant - I love the concept of interim/byte code and JIT so that code is portable.
            generics not as good as C++ I understand due to .NET's type system making it not possible.
            for example in C++ there is a pattern known as the <a href="https://en.wikipedia.org/wiki/Curiously_recurring_template_pattern">curiously recurring template pattern</a> (CRTP) where you can achieve static polymorphism which cuts out the run time costs associated with the dynamic variant i.e. requiring a virtual table (an extra 4/8 bytes per object) and having to dereference objects twice.
            You cannot do this kind of template trickery in .NET.
            However I believe achieving maximum efficiency should not by default be the first and foremost aim of software.
            Good design, readability and robustness should come first, and I believe you should only consider going to these lengths when absolutely necessary.
            Have always been impressed with the performance of .NET programs, I would be interested to see a comparison between a C++ program.
            I also love the all pervasive collection of freely available namespaces and assembles accessible through NuGet that greatly simplify and shorten development and take code reuse to new levels.
            Hopefully gone are the days of using Windows C functions such as '_beginThreadEx' and 'CreateWindowEx' that take X amount of parameters, or having to create things like "message pumps" *shudders*.
        </p>

        <h2>Javascript</h2>
        <p>
            Javascript is the language I have learned most recently, it is very refreshing to come from very strictly typed languages such as C++ and .NET and take advantage of it's very simple and forgiving syntax.
            The concept of transpilation is very much a bit of me!
            I was first introduced to this concept when I read a book by Bertrand Meyer on his Eiffel programming language that is transpiled to C.
            Reusing the already available and mature C compilers to produce optimised native executable code takes away a lot of the complexity of producing an executable and gives you the portabilty of C.
            Leveraging Babel allows you to use the latest features of Javascript on a wide range of browsers.
            There is probably a fundamental technical reason for why it's not possible, but why Javascript can't be compiled to binary using a predetermined byte order (i.e. little endian) to save on file size downloaded by clients but also remove the need for it to be translated before it can be executed.
            I've written a fair amount of Typescript code and it performs the job well but I'm not sure using types fits in with the essence of Javascript.
            I prefer to write pure Javascript, now having to use types everywhere makes the coder quicker to produce and feels less rigid.
            Using unit tests and pure functions may circumvent the need for Typescript.
            I was first introduced to functional programming in C++/STL with std::function and std::bind and used it to great effect in my PC/C++/Ogre game.
            I love the functional approach where everything is a function, coming from a OO background it requires you to think about applications very differently.
            At the moment I tend to mix OO and functional paradigms in programs, I think I'm yet to fully appreciate the power of functional code.
            Especially with the advent of React hooks which moved away from the use of classes//sidtodo.
            I think some applications suit OO well like my text parse library due to the large amount of statement types but would be interested to rewrite it using a functional approach.
        </p>

        <h2>Unit Testing</h2>
        <p>
            //sidtodo expand/rephrase
            This is something I have been taking advantage of for a while but always in an adhoc manner, <a href="https://github.com/sidfishus/BlockAllocator/blob/master/BlockAllocator_UnitTests.h">for example</a>.
            I would like to look at some of the unit testing platforms that are available.
            I would like to revisit some of my old code and enforce a strict functional and unit test approach.
            Or work for a company that enforces a similar rule, where unit tests and test driven development is an integral part of their development process.
        </p>

        <h2>Open Source</h2>
        <p>It is very inspiring to see the way the open source community is flourishing.
            For example I would never have imagined that Microsoft would begin releasing code like they have with their Roslyn compiler and their ASP .NET MVC Core libraries.
            The abundance of freely available code has allowed me to create this web site without having to reinvent the wheel and it feels like we are working together to share a better future.
            If you removed the content, I imagine that less than 10% (rough guess) of the codebase in this application is actually my own.
            I hope this trend continues!
        </p>

        <h1>Hobbies</h1>
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

        
        <h1>Beginnings</h1>
        <p>I find it very random and lucky how I stumbled across programming.</p>
        <p>When I was 16 my father bought me a PC with access to dial up 56k internet to held with my A levels.
            Whilst browsing the internet I discovered the MSN chat room service.

            'Golden hammer' 
        </p>

        
        <p>This started my quest to find ..</p>

        <p>Can't emphasise enough the advantage this gave me when I went to university and first started working.
            I already had 5 years solid experience behind me.
        </p>

        <p>writing 'deop' protection and for some reason we had the idea that writing the most 'complicated' code gave you the advantage, when it was in fact ping made the difference.
            the closer you were to the chat servers the quicker you would be
        </p>

        <p>If you want to introduce children to programming then give them real world scenarios they are interested in to create programs for</p>


        <h1>Current and Future</h1>
        <p>I do believe there is such a thing as too much technology and think it's de-sensitising us to the world around us</p>
    </>
);