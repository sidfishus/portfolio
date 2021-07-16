
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo, Code } from "../Presentation";
import { eScreenResolution } from "../Client App";

export interface IProgrammingDiscussionProps {
};

export const ProgrammingDiscussion: React.FunctionComponent<IProgrammingDiscussionProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <CppDemo />
            <DotNetAndCSharp {...props} />
            <Javascript />
            <OpenSource />
        </ContainerDemo>
    );
};

const CppDemo: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="C++">
            <p>
                For 15 years I was a C++ stalwart, being mentored and inspired by some very intelligent and
                experienced C++ coders whilst working for Prophet and this experience was invaluable.
                This taught me the importance of being meticulous, and writing careful and resilient code which is
                robust enough to run in a real-time production environment.
            </p>

            <p>
                I understand the inner workings of C++ more so than any other language, for example the fact
                that polymorphic functions are achieved through the use
                of a virtual table pointer and this adds 4/8 bytes to the size of an object as well as requiring an
                extra dereference.
                As well as the fact that
                <a href="https://stackoverflow.com/questions/6308915/member-fields-order-of-construction"> class
                and struct member variables are constructed in the order in which they are declared</a> and not
                the order in which they are specified in the constructor!
                I fixed at least one bug caused by this obscurity in a production environment.
            </p>

            <p>C++ is a very powerful language where you have absolute control, you can achieve a lot by combining
                it's OO features with templates and
                with great efficiency. With this power however comes great responsibility and you must apply a great
                level of maturity in order to be a good C++ programmer.
                Forgetting to deallocate memory in C/C++ is easy to do unless you write code in such a way, and can,
                and has, literally cost lives.
                I can't find a reference to it via search engines, but I was told a story where a key hospital system
                ran out of memory and was offline due to a developer forgetting to call delete/free.
                I also know of production applications that have to be restarted multiple times per day due to long
                standing unfixed memory leaks!
                Newer language features mitigate
                this, for example std::shared_ptr which automatically manages the life time of objects
                when using dynamic memory but makes the syntax awkward when ultimately all you really
                want to do is create an object! And if you use std::auto_ptr you have to remember the caveat
                that assigning one instance to another actually transfers ownership of the underlying object.
            </p>

            <p>
                I believe the amount of flexibility C++ gives you comes with a cost of loss of readability,
                increased development time, loss of sight of the bigger picture, and increased potential for bugs.
                Plus my experience is that there are few developers who are competent enough to be effective professionally.
                The STL is great but the syntax
                is very awkard and results in the loss of readability for the sake of efficiency - 
                <a href="https://en.cppreference.com/w/cpp/utility/functional/placeholders"> (for example)</a>.
            </p>

            <p>
                At Prophet significant resources were spent on low level details such as static analysis
                for example through the use of 
                <a href="https://docs.microsoft.com/en-us/cpp/code-quality/using-sal-annotations-to-reduce-c-cpp-code-defects?view=msvc-160"> Microsoft SAL Annotations </a>
                which leverages the compiler for finding C/C++ style bugs at compile time and to maximise runtime efficiency.
                I felt this detracted from the readability and terseness of the code, made it slower to produce and
                was another hurdle for the less competent programmers.
                I would rather spend the time writing self testing code through the use of unit tests.
            </p>

            <p>
                Upon transitioning to web I've been able to become competent in a plethora of technologies in a short
                space of time without needing to know such low level implementation details.
                I am definitely beginning to prefer more declarative style languages which have a more intuitive and
                simple syntax and that don't require you to use things like <Code inline={true}>static_cast&lt;int&gt;</Code>.
                I don't think it's a good idea or necessary to create large scale systems where the majority of the code
                base is C++. Computer games where efficiency is key is an exception, but with
                <a href="https://en.wikipedia.org/wiki/Moore%27s_law"> Moore's law</a> and the advent
                of cloud based computing you can simply scale up or scale out.
            </p>

            <p>
                I would definitely recommend that new developers learn a low language such as C or C++.
                Through this you will gain a thorough understanding of how programs execute and
                the complexities that are hidden when using higher level languages.
                And once fluent, it is my experience that it is very easy to learn more modern languages
                which borrow a lot of the concepts and syntax.
                Higher level languages, and with the inventation of garbage collection can make you complacent or
                lazy especially if you do not have any experience programming in low level languages and this
                can result in highly inefficent code.
            </p>
        </SegmentDemo>
    );
};

const DotNetAndCSharp: React.FunctionComponent<IProgrammingDiscussionProps & IRoutedCompProps> = (props) => {

    const { mediaMatching } = props;

    if(!mediaMatching) return null;

    const isMobile = ((mediaMatching.FirstMatching() === eScreenResolution.Mobile)?true:false);

    const usingCode = ((isMobile)?
        <>using MyIntList = System.Collections.Generic.List&lt;<br/>&#9;&#9;<b>System.Int32</b> /* MyInt */&gt;;</> :
        <>using MyIntList = System.Collections.Generic.List&lt;<b>System.Int32</b> /* MyInt */&gt;;</>
    );
    
    return (
        <SegmentDemo heading=".NET and C#">
            <p>.NET and C# are brilliant.
                With .NET and C# efficient portable large scale applications can be created with ease and
                without having to write any utility type code yourself.
                The all pervasive collection of open source assembles accessible through Github and NuGet
                greatly simplify and shorten development times and take code reuse to new levels.
                And I absolutely love the concept of interim/byte code and JIT compilation which provides portability.
            </p>

            <p>
                With C# and .NET, gone are the days of using Windows API C functions such as '_beginThreadEx' and
                'CreateWindowEx' that take a ton of obscure parameters, or having to create things like
                "message pumps" *shudders*. And writing multi-threaded code is now an absolute dream through the
                use of Task and the async and await keywords. These make it so simple to leverage more of the
                available hardware and encourages developer's to create multiple threaded applications and this
                is further enhanced with so much of the .NET framework functions having async versions.
            </p>

            <p>
                Generics in .NET are not near as powerful as C++ templates but I have not reached a situation
                where I can't a work around for their limitations.
                For example in C++ I have used a design pattern known as the
                <a href="https://en.wikipedia.org/wiki/Curiously_recurring_template_pattern"> curiously recurring template pattern </a>
                (CRTP) where you can derive from a base class template where the derived class is also a template parameter to the base class
                to achieve static polymorphism. This cuts out the run-time costs associated with dynamic polymorphism which requires an
                additional 4/8 bytes per object and an extra dereference when a virtual method is called.
                You cannot do this kind of template trickery in .NET but is it necessary?
            </p>

            <p>
                One feature that is paramount in my programming but unfortunately not available is the equivalent of the C++
                <Code inline={true}> typedef</Code> keyword.
                In C++ this allows you to declare your own type definition in a single place in a header file and
                reference that throughout the project, providing encapsulation and
                <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself"> reducing code repetition</a> which in my opinion is the key to
                good programming.
                The closest equivalent in C# is the <Code inline={true}>using</Code> which requires a copy of the type
                definition per .cs file and can't contain nested type definitions :(. For example:
                <Code>
                using MyInt = <b>System.Int32</b>;<br/>
                {usingCode}
                </Code>
            </p>
        </SegmentDemo>
    );
};

const Javascript: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Javascript/Typescript">
            <p>
                Javascript is the language I have learned most recently, it is very refreshing to come from
                strong static typed languages such as C++ and take advantage of it's very simple and forgiving nature.
            </p>
            <p>
                The concept of transpilation is very much a bit of me!
                I was first introduced to this concept when I read a book by Bertrand Meyer discussing his object oriented
                Eiffel programming language which is transpiled to C rather than to native object code.
                Leveraging transpilation in Javascript via Babel allows you to create very portable code and to use the
                very latest Javascript features
                and in a wide range of browsers including obsolete ones such as Internet Explorer. So it is not necessary
                to write lowest common denominator code, i.e. be limited to the feature set which is natively available in
                all of the target browsers.
            </p>

            <p>
                I have written a substantial amount of Typescript code but I'm not sure if it's a step in the right
                direction.
                Having a solid C++ background which is strongly typed, one of the things I find most refreshing about
                Javascript is that there are no types. I just find it quicker and more pleasant to produce and read
                vanilla Javascript code. I have used the Facebook Flow static type checker and this works
                brilliantly without the developer having to specify types in the code.
            </p>
        </SegmentDemo>
    );
};

const OpenSource: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Open Source">
            <p>
                It is very inspiring to see the proliferation of open source code now freely available
                and technologies such as Github, NPM and NuGet that make it very easy to take advantage of it.
            </p>

            <p>
                Without all of this it would not have been possible for me to create this application (I havn't
                got the time to create ASP .NET or React for example).
                If you removed the content, I estimate that less than 5% (rough guess??) of the codebase in this application is actually my own.
            </p>

            <p>
                I hope this trend towards open source programming continues!
            </p>
        </SegmentDemo>
    );
};