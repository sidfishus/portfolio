
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo } from "../Presentation";

export interface IProgrammingDiscussionProps {
};

//sidtodo
/*
<p>I believe that the key to getting children engaged with computer programming is by giving them real world scenarios they are interested in to creating solutions for.
            For example MSN chat//sidtodo
        </p>
*/

export const ProgrammingDiscussion: React.FunctionComponent<IProgrammingDiscussionProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <CppDemo />
            <DotNetAndCSharp />
            <Javascript />
            <UnitTesting />
            <OpenSource />
        </ContainerDemo>
    );
};

const CppDemo: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="C++">
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
        </SegmentDemo>
    );
};

const DotNetAndCSharp: React.FunctionComponent<{}> = () => {
    
    return (
        <SegmentDemo heading=".NET and C#">
            <p>.NET and C# are brilliant - I love the concept of interim/byte code and JIT so that code is portable.
                generics not as good as C++ I understand due to .NET's type system making it not possible.
                for example in C++ there is a pattern known as the <a href="https://en.wikipedia.org/wiki/Curiously_recurring_template_pattern">curiously recurring template pattern</a> (CRTP) where you can achieve static polymorphism which cuts out the run time costs associated with the dynamic variant i.e. requiring a virtual table (an extra 4/8 bytes per object) and having to dereference objects twice.
                You cannot do this kind of template trickery in .NET.
                However I believe achieving maximum efficiency should not by default be the first and foremost aim of software.
                Good design, readability and robustness should come first, and I believe you should only consider going to these lengths when absolutely necessary.
                Have always been impressed with the performance of .NET programs, I would be interested to see a comparison between a C++ program.
                I also love the all pervasive collection of freely available namespaces and assembles accessible through NuGet that greatly simplify and shorten development and take code reuse to new levels.
                Hopefully gone are the days of using Windows C functions such as '_beginThreadEx' and 'CreateWindowEx' that take 20 parameters, or having to create things like "message pumps" *shudders*.
            </p>
        </SegmentDemo>
    );
};

const Javascript: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Javascript">
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

                Why does the programmer need to declare types at all when the compiler can infer their usage from the body of the code, and create a type file based on that information, for example with the 'auto' and 'var' keywords in C++/C# respectively. I would like to give this ago myself, and produce C# off the back of it. //sidtodo
            </p>
        </SegmentDemo>
    );
};

const UnitTesting: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Unit Testing">
            <p>
                //sidtodo expand/rephrase
                This is something I have been taking advantage of for a while but always in an adhoc manner, <a href="https://github.com/sidfishus/BlockAllocator/blob/master/BlockAllocator_UnitTests.h">for example</a>.
                I would like to look at some of the unit testing platforms that are available.
                I would like to revisit some of my old code and enforce a strict functional and unit test approach.
                Or work for a company that enforces a similar rule, where unit tests and test driven development is an integral part of their development process.
                I think the concept of self testing code is absolutely brilliant and I will use it as much as possible!
            </p>
        </SegmentDemo>
    );
};

const OpenSource: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Open Source">
            <p>It is very inspiring to see the way the open source community is flourishing.
                For example I would never have imagined that Microsoft would begin releasing code like they have with their Roslyn compiler and their ASP .NET MVC Core libraries.
                The abundance of freely available code has allowed me to create this web site without having to reinvent the wheel and it feels like we are working together to share a better future.
                If you removed the content, I imagine that less than 10% (rough guess) of the codebase in this application is actually my own.
                I hope this trend continues!
            </p>
        </SegmentDemo>
    );
};