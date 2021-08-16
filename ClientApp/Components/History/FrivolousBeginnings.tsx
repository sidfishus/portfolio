
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo, Code } from "../Presentation";

export interface IFrivolousBeginningsProps {
};

export const FrivolousBeginnings: React.FunctionComponent<IFrivolousBeginningsProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <MSNChat />
            <SplitBots />
            <VisualBasic />
            <ChatActiveXControl />
            <CPlusPlus />
            <TheEnd />
        </ContainerDemo>
    );
};

//TODO try to find screenshots from my PC - old D drive.
const MSNChat: React.FunctionComponent<{}> = () => {
    
    return (
        <>
            <SegmentDemo heading="Foreword">
                <p>My introduction to programming was extremely lucky.</p>
                <p>
                    If I had not have stumbled across MSN Chat I likely would have followed a completely different career path as up until this point I had no idea of how I was going to make a living.
                    A job in the fishing industry would have been ideal but at the time I had no relevant skills other than being reasonably good at catching carp, and the market was already saturated with passionate fisherman with the same "pipe dream".
                    I did not connect with my A level subjects either, so I was/am very thankful for finding a new hobbie that I could also do as a career.
                </p>
                <p>This page explains in detail how I accidently discovered programming and what motivated me to continually improve and pursue new skills and knowledge.
                    It is also a story that geeks and hackers may relate to or find interesting.
                    This page may seem irrelevant, but I can't emphasise enough the advantages my experiences programming on MSN Chat gave me when I was studying at university and working for Prophet.
                    It gave me 5 years of solid programming experience which included publically releasing 1000's of lines of code, as well as tutorials, and progressively developed my
                    analytical and problem solving mindset.
                    I also learned a lot about human behaviour!
                </p>
            </SegmentDemo>

            <SegmentDemo heading="Discovering MSN Chat">
                <p>When I was 16 my father bought me a PC with the Windows 98 OS installed and a 56k modem for the purpose of aiding me in my A level work and studies.
                    I had previously used online chat rooms whilst at my friends house to speak to the opposite sex and generally have fun.
                    Now I was armed with my own computer I decided to try this out again and after a quick google search for "UK chat rooms" I found MSN Chat.
                </p>
                <p>
                    <a href="https://en.wikipedia.org/wiki/MSN_Chat">MSN Chat</a> was a website that incorporated a directory listing of chat rooms (referred to as channels) that were split between specific topics (teen, computing, e.t.c.).
                    Once you had created an account you could then select a channel and join it to speak to people from all over the world via your <a href="https://raw.githubusercontent.com/sidfishus/react-spa-demo/master/wwwroot/img/msn-webchat.png">internet browser</a>.
                    You could also create your own public channel which gave you additional digital powers such as the ability to set the chat room subject, and mute, kick and ban other chatters.
                    To denote this, channel owners in the nickname list had a golden hammer icon next to their name, and channel hosts (less power) had a brown hammer
                    icon next to their name (ahh the memories).
                </p>
                <p>
                    It was difficult and time consuming to create a new channel and make it popular but I had found out that it was possible for multiple chatters to have channel owner access.
                    When you create a new channel a special password (owner key) was generated and placed in a specific location in the Windows registry.
                    With this knowledge I began social engineering unsuspecting channel owners in busy channels into telling me the owner key, and I would then 'take over' the chat room by entering the '/pass &#60;owner key&#62;' command and quickly 'kick banning' the other owners.
                    Ridiculous I know, but at the humble age of 16 this was great fun!
                </p>
            </SegmentDemo>
            <SegmentDemo heading="The Turning Point">
                <p>
                    One day I entered a busy channel where everybody was an owner and had these cool ASCII nicknames and I couldn't keep up with what was happening.
                    For example, all user's could be kicked out in an instant by one user but they would all instantly rejoin. Occasionally user's would get "revenge"
                    by making themself an owner again and return the favour by kicking the other user out, seemingly as an automated response.
                    I remember being frustrated for having to continually refresh my browser in order to rejoin after being kicked, and finding I no longer had
                    owner privileges when typing commands to kick the other users.
                    I was confused and excited, for whatever they were doing and however they were doing it, I wanted to be able to do the same!
                </p>
                <p>
                    After venturing into lots of other channels and speaking to various people I found out that they were using 'bots' and 'scripts'.
                    After more searching I found a user who was chatting to me via a bot named '<a href="https://raw.githubusercontent.com/sidfishus/react-spa-demo/master/wwwroot/img/ircdominator.gif">IRC Dominator</a>' who explained some of it's features which were not available when connecting through a browser.
                    Not being backwards in coming forward, I was quickly extracting the information from him on how to download and use it.
                    I followed the instructions, which involved pasting '<a href="https://raw.githubusercontent.com/sidfishus/react-spa-demo/master/wwwroot/img/ircdom-cookies.jpg">cookies</a>' into the application (which were obtained by doing a 'view source' in a browser chat room session), keyed the name of the channel I wanted to join, and hit the enter key.
                    Bosh, I was in!
                    The user was indeed telling the truth as this application boasted a plethora of cool features that up until now I had only dreamed of.
                    This helped me take my channel stealing and rank amongst the MSN Chat elite up to the next level!
                </p>
                <p>This was great fun for a while but IRC Dominator had it's imperfections (it used to crash regularly) and I still felt limited.
                    I was hearing more and more about what you could achieve with scripts and a lot of the information was going over my head at the time.
                    After lots of begging and some failed attempts I managed to talk someone in to sending me a working 'script' which consisted of an application called <a href="https://www.mirc.co.uk/">mIRC</a> and various text files.
                    As per my new best friend's advice, I ran the mIRC.exe and typed a number of commands into a prompt which included the same cookie approach as IRC Dominator and lastly typed "/join %#&lt;name of channel&gt;" and hit enter.
                    Something positive seemed to be happening as large swathes of jargon produced in cool colours and ASCII art scrolled down the screen until a seperate window inside mIRC opened up which appeared to be a representation of the channel within the mIRC user interface.
                    I was logged in to the same channel via my browser and I noticed that the second user account I was using specifically within mIRC had indeed joined and could send and receive chat room events.
                    Yes! I had finally successfully connected via a script!
                </p>
            </SegmentDemo>
            <SegmentDemo heading="Scripting">
                <p>
                    I still didn't understand why this was called a script but I dove straight into finding what new features I had gained and tried to make sense of how it all worked.
                    Similar to a web browser session, right clicking a user in the 'nick list' window opened a typical Windows context menu with a whole host of commands that you could apply to that user.
                    And additionally right clicking in the channel window brought up another context menu with another list of commands such as 'null take', 'mass kick', 'mass ban', 'mass deowner'.
                    I was also told by the user who sent me the script that there were also a number of 'aliases' available, which were commands you could type preceded by a '/'.
                    And apparently all of this was completely customiseable.
                </p>
                <p>
                    After doing some investigation in to this mIRC I found that it had a built in text editor like notepad and the ability to add and edit text files. 
                    There was already a number of text files loaded into mIRC and I spent some time skimming through them.
                    One of the aliases (/scroller &lt;text&gt;) I had been told about would speak the specified text with an increasing number of asterixes.
                    Whilst reading the text files I came across the line "<Code inline={true}>alias scroller &#123;</Code>" and the cogs in my adolescent brain starting turning - had I found the essence of the scroller command?
                    I copied and pasted the code which seemed to encompass the scroller command but changed the top line to "<Code inline={true}>alias scroller2 &#123;</Code>", and changed the '10' to a '5' (the original would scroll the text 10 times).
                    I then typed /scroller2 into the command prompt and it worked as expected!
                    My first ever lines of code!
                    I later found out that these text files were the 'scripts' everyone was referring to and 'scripting' was the process of writing code in this manner.
                    I was therefore now a scripter!
                </p>

                <p>The mIRC script language (at the time) had a syntax similar to Javascript and included most of the typical features you expect to find in a simple scripting language.
                    There were no data types and there was no compiler/transpiler or syntax checker.
                    The only feedback you would receive would be an error message shown in the active window whenever a line of code being executed contained a syntax or logic error.
                    It didn't offer closures, object orientation or anything like that, but the syntax was intuitive and had enough keywords to facilitate the creation of complex algorithms, as well as featuring a comprehensive list of built in commands and events such as TCP/IP and UDP sockets and the ability to extend mIRC through the use of DLL's.
                    And you could also create Windows style dialogs via a user interface editor.
                    With mIRC you could create practically any software you could imagine, for example I created an MSN Messenger client that integrated with the mIRC switchbar and private messaging functionality.
                </p>
            </SegmentDemo>
            <SegmentDemo heading="Connection Scripts">
                <p>
                    After progressing my scripting abilities and furthering my understanding of the relationship between mIRC and MSN Chat I went one step further and decided to attempt writing a "connection" script.
                    Understanding how and being able to connect mIRC to MSN Chat was key to having an edge over the other scripters I was in effect competing against.
                    Connection scripting sent me down a path where I realised my preference for what's known as 'back-end' programming, in contrast to the more front-end type applications I had been working on
                    up to this point.
                </p>
                <p>
                    mIRC out of the box worked seemlessly with standard IRCx and IRCd type TCP/IP servers (the 2 types that I remember using) and MSN Chat was IRCx based, however it had a number of additional features and nuances such as authentication that mIRC did not directly support.
                    Rather than using the standard mIRC '/server &lt;IP&gt; &lt;port;&gt;' command to connect directly to MSN Chat (which would fail), the connection and traffic between the mIRC client and the MSN Chat network had to be manually scripted and the packets manually manipulated.
                    The first part was to create a proxy connection to the mIRC client which is achieved by creating a local server using the '/socklisten &lt;socket name&gt; &lt;port&gt;' command, and then a '/server 127.0.0.1 &lt;port&gt;' command.
                    The second step was to create a connection to the relevant MSN Chat server via the '/sockopen &lt;socket name&gt; &lt;IP&gt; &lt;port&gt;' command and handle the initialisation and authentication yourself in the mIRC script.
                    Then for example to join a channel, you would enter '/join &lt;channel;&gt;' into the mIRC server window for which the local connection/proxy would receive via a 'socket read', and then forward it on to the MSN Chat server using the relevant IRCx/MSN Chat command via a 'socket write'.
                    If the join request was successful, you would then receive a number of packets in the MSN Chat socket and these were parsed, manipulated under the circumstances where mIRC did not support a command, and forwarded on to the local proxy/mIRC connection.
                    When the mIRC client receives the packets, the built in functionality would be triggered and behave as though it was connected directly to MSN Chat, which involved opening a new window for the channel, populating the nickname list, and showing the current topic.
                </p>
                <p>        
                    To learn all of this I began methodically stepping through the connection script I was using at the time
                    (named QuickChat and by a scripter named 'Cyborg' who I eventually became friends with), and using the mIRC 'echo' command
                    to debug trace the packets.
                    There were 2 separate MSN Chat connections involved, a connection to a fixed IP referred to as the "directory server" in this
                    script, and a separate connection to the chat server.
                    There were 8 chat servers at the time which was later extended to 10 servers, and a given channel was hosted on one
                    of these servers and accessed directly.
                    It was the purpose of this "directory server" to tell clients the specific IP a channel was on and this was achieved
                    via a 'FINDS' command, as well as to provide a command to create new channels.
                </p>

                <p>
                    In order to successfully connect to the servers you had to go through a complex 2 part authentication process.
                    The first part involved responding to a packet containing a random 8 character length string, except the hashing algorithm required was hidden (and unknown to us at the time) inside the
                    official MSN chat
                    ActiveX control compiled binary that integrates with your browser.
                    To get around this we used mIRC script code to create a hidden browser window containing the HTML required to load and spoof a connection between the chat ActiveX control and localhost, as though localhost was actually the chat service.
                    The 8 character challenge received from the chat service was forwarded on to the chat ActiveX control which delightfully replied with the answer, and this was forwarded back to the chat service gaining us access.
                    The second part of authentication involved sending the MSN Chat passport cookies which had to be regenerated every 24 hours for which I was already in the habit of doing.
                </p>

                <p>
                    As my knowledge increased I rewrote many parts of QuickChat until I felt confident enough to start from scratch.
                    The first connection script I made (named r00t) followed the same principles of QuickChat and was released to released to the public via a popular mIRC scripting site at the time.
                    And I couldn't resist the temptation to add a hidden backdoor which meant I would automatically be given owner access whenever I joined a channel containing an owner using my script ;-).
                </p>

                <p>
                    rOOt was quite well received but it didn't stand out at the time, there was nothing particularily special about it, although it did gain me extra kudos due to there being
                    less than a handful of released connections at the time.
                    Scripters were fixated with speed, if you were faster than everyone else at anything then you were considered "elite", when in reality it was all down to bandwidth and ping!
                    For example we used to write "deowner" protection code so that we could react as quickly as possible to prevent channel take overs.
                    And for some reason we were under the illusion that the more complicated we could make this the faster we would react and would go to great lengths including nesting string
                    parsing functions like $gettok!
                    Joining a channel would incur a lag of at least 2 seconds due to the number of connections involved and having to determine which server a channel was on.
                    So I came up with the idea of using pre-connected sockets: upon opening mIRC, the connection script would connect a socket to each of the 8 servers and leave them idle.
                    Joining a channel was then a case of sending a "JOIN %#&lt;Channel&gt;" command to each of the pre-connected sockets simulataneously and the relevant one would join.
                    Voila - virtually instant connection!
                    I released this connection as "Direx" and it was very popular, and again I couldn't help but add a 'backdoor' which I used on a number of occasions to
                    <a href="https://xt.proboards.com/thread/1017/connected-first?page=3"> recapture</a> stolen channels from a well known troll at the time (Arrow).
                    There was an MSN Chat command "WHO" that you could use to search for users on the network, when my connection authenticated it sent a certain signature as part of the authentication process
                    and this could be looked up via the WHO command.
                    This allowed me to determine every user on the network using Direx, what channel(s) they were in, and what status they had in those channels.
                    Using this method I went on a channel taking spree taking 50+ channels in a day including some of the most popular!
                </p>
            </SegmentDemo>
        </>
    );
};

/* sidtodo C++ split bot screenshot */
const SplitBots: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Split Bots..">
            <p>
                Occasionally the chat servers would be rebooted for maintenance and when the server a given channel was on was rebooted ("split") you had the opportunity to recreate it.
                There was a number of very popular chat rooms (%#Somewhere, %#Hackers and %#Unknown being the key 3) that the opposing cliques/factions of users were perpetually trying to own.
                It was typically the best scripters that were in control of them so they were already wise to the typical methods used to take channels.
                Unless there was a freak event such as an owner having their MSN passport hacked, using a script containing a backdoor or deciding to change their allegiance, the best method
                to get these channels was to try and split them.
            </p>

            <p>
                The original MSN chat hackers/programmers had devised programs ("split bots") that would take advantage of channels splitting by connecting 100's of sockets to
                the directory server and repeatedly send the create channel command on a cycle.
                If you were lucky enough to send the create command at the exact time you would be rewarded with the recreation of the channel and become the new owner.
                I created my own split bots in mIRC and then later on a standalone application written in C++, and used these to gain
                ownership of each of the 3 key channels at least once.
                A similar analogy to the power grab surrounding the 3 MSN Chat key channels is US politics, except there were more than 2 parties involved.
                An election is analogous to the server's splitting - effectively a transfer of power - if a single group gained access to 2 or more of the channels (presidency, senate and house)
                after the server reboot had finished then they really were in control.
            </p>
        </SegmentDemo>
    );
};

const VisualBasic: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Visual Basic">
            <p>
                I was now well into programming and looking to expand my skills.
                Visual Basic was a topic that came up regularly in conversations as a number of the scripters could also program in Visual Basic.
                I had a lot of spare time on my hands, I wasn't taking my A Levels as seriously as I should and I'd stopped doing sports, I was completely immersed
                in this new found world I had stumbled across.
                I was still a passionate carp angler though and the lakes I was fishing at the time gave me the perfect opportunity because I didn't have to pay
                (my dad did work for the owner and we helped him move fish between lakes) and they were mostly empty during the week.
                They were also very hard, it could be 2-3 days between bites, and therefore once the rods were out you just sat and waited.
            </p>
            <p>
                Most of the holidays I had were spent camping at the lakes, my dad would drop me off with enough provisions and pick me up a week later looking like Worzel
                Gummidge.
                Absolutely wonderful times and I capitalised on my free time by reading up on programming and computers, as well as studying for exams and doing coursework.
            </p>
            <p>
                Getting back to Visual Basic, I purchased a book and spent my next fishing trip reading it.
                This was the first time that I had been introduced to data types and the Windows API so it was quite a step up, but it seemed to resonate naturally well with me.
                After the trip I downloaded the Visual Basic IDE and was instantly successful in creating Windows Visual Basic applications.
                I didn't feel the motivation to create a full blown MSN Chat client in VB because a lot of the work would be front-end oriented and mIRC already offered a
                nice and easily configurable UI, and there was still a lot I didn't understand about the MSN Chat network.
                I wasn't/am not a fan of the language or IDE either but learning VB was a good stepping stone in terms of programming experience and has been useful at various times
                during my programming career: for example Prophet could be scripted using VB script and I wrote and edited a number of complex scripts, as well as becoming the
                lead developer on 2 large-scale classic ASP ERP web applications and a project to convert them to ASP/VB .NET.
            </p>
        </SegmentDemo>
    );
};

const ChatActiveXControl: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Reverse Engineering the Authentication Algorithm">
            <p>
            The biggest hindrance to connecting to the chat service was the use of the ActiveX control.
            Having to create a browser window with the OCX embedded per channel connection was slow and resource heavy and limited the amount of connections we could make at any one time.
            For the various types of bots and scripts we were using you could have up to 1000 sockets simultaneously connected which had to be done sequentially.
            </p>
            <p>
                Around this time one of my online friends (Sky) gave me the source code to a Visual Basic program that could connect without having to use the MSN Chat OCX, however it only worked approximately 80% of the time.
                This was the absolute holy grail and was to my knowledge unheard of at the time!
                Apparently he had received it from a well known hacker who frequented MSN Chat (AL..) who had reverse engineered the OCX and reproduced the challenge algorithm in VB.
            </p>
            <p>
                From memory the algorithm consisted of unpacking the challenge you receive from MSN from a string to an array of 8 bytes, appending it to a fixed string and running it through a MD5 checksum.
                The result of the checksum was then added to another fixed string and then MD5'd again.
                I played around with the application and noticed that only when the challenge contained "\0" as part of the string would authentication fail.
                After digging in to the code I found it was treating the challenge as a C style string as opposed to an array of bytes and thus stripping out the part of the challenge after the \0 - \0 has a special meaning in C style strings and is used to mark the end of a string.
                To find the length of a C style string you must linearly search through the algorithm until the null terminator is found (which is how the C strlen function works).
                VB and COM strings (BSTR) work differently in that they are actually a struct with the length of the string preceding the first character of the string.
                Changing this part of the code worked as I desired and now authenticated 100% of the time!
            </p>

            <p>
                I then reproduced the same algorithm in mIRC script so we could use it in our connection scripts and circumvent any need for the OCX.
                This gave me the ability to connect 100's of sockets at once with hardware and bandwidth now being the only limiting factors.
                Yes!! Me and my friends now had a definitive advantage over everybody else until Sky later decided to release his version to the public!
            </p>
        </SegmentDemo>
    );
};

const CPlusPlus: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="C++">
            <p>
                On MSN Chat, if you had knowledge of C or C++ then you were "the man" and it gave you the bragging rights over lesser coders.
            </p>
            <p>
                By now I had learned that mIRC script was slow, and became slower the more script code was loaded in to it, we really were pushing it beyond it's
                capabilities with the scripts we were creating.
                Ideally I wanted to move as much of the mIRC code as possible to another programming language that was compiled but retain the mIRC client as a user interface.
                Being highly complex and involving a lot of parsing and number crunching, the authentication algorithm would also benefit from being in another programming
                language and have another significant performance improvement on connection times.
            </p>
            <p>
                mIRC has the ability to execute functionality in a DLL, I had no experience with C++ up until this point but I found a tutorial on how to create a C++ DLL and
                call it from mIRC and did a proof of concept.
                I remember this was the summer holiday before I started university so I still had a lot of free time at my disposal, I bought
                a <a href="https://www.amazon.co.uk/Wileys-Teach-Yourself-Stevens-2003-04-04/dp/B01A65I12C">book on C++</a> and read it on my next fishing trip.
                Up until now I had took to programming like a duck to water, but learning C++ was challenging.
                I recommend any newcomer to programming to at least spend some time on C or C++, or even Assembly, because it really does give you a deeper understanding
                of how software works.
                Using high level languages can cause you to to become too abstracted from what's really happening and be complacent and write lazy code, and therefore I believe
                it's helpful to be able to understand it from a low-level perspective as well.
                I partly regret I wasn't born 10 years earlier when low level programming was more common place and important, I'm a control freak, I want to know how everything works.
            </p>
            <p>
                I digress, I don't think I quite understood pointers to begin with, but reading this book gave me enough of an understanding to be able to recreate the authentication hash
                algorithm in a C++ DLL that could be called at will by mIRC.
                I then created a mIRC/C++ hybrid connection where the sockets were mIRC based but all of the socket event handling was in C++, this dramatically reduced the
                mIRC script codebase and encapsulated most of the complex and time consuming code as a compiled binary.
                In retrospect now it would have been better to write a C++ program which encapsulated the full connection to MSN and sent/received commands to/from
                mIRC so that mIRC and mIRC script was only concerned with the user interface and things external to the connection.
                Further to this I also created a split bot as an executable written entirely in C++ which was another major advantage.
            </p>
        </SegmentDemo>
    );
};

const TheEnd: React.FunctionComponent<{}> = () => {
    
    return (
        <SegmentDemo heading="The End">
            <p>
                This is as far as I got on MSN because the network was closed in <a href="https://www.itprotoday.com/windows-8/conversation-over-msn-closing-chat-rooms-worldwide">2003</a> :(.
                It's hard to explain why I was so fascinated with MSN Chat at the time, I really had a great time and I wasn't alone as it was very popular amongst computer programmers at the time.
                It taught me a lot about myself, gave me a ton of programming experience, set me on my career path, and gave me a lot of confidence to go
                and do what I enjoyed and was clearly good at.
            </p>
            <p>
                It seems strange to say, but I almost get butterflies in my stomach when I think of those days.
                Randomly hearing one of the sound effects used within the original MSN Chat application brings memories flooding back.
                It wasn't just directly MSN Chat but also my age and the experiences I had at the time.
                Perhaps one day I'll have a go at recreating MSN Chat, not just another IRC network, but one that has that MSN Chat look and feel.
            </p>

            <p>I really could write a book about my experiences and exploits (maybe one day I will) and have very fond memories, long live MSN Chat.</p>
        </SegmentDemo>
    );
};