
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo } from "../Presentation";

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

//sidtodo try to find screenshots from my PC - old D drive.
const MSNChat: React.FunctionComponent<{}> = () => {
    
    return (
        <>
            <SegmentDemo heading="Foreword">
                <p>My introduction to programming was extremely lucky.</p>
                <p>
                    If I had not have stumbled across MSN Chat I likely would have followed a completely different career path as up until this point I had no idea of how I was going to make a living.
                    A job in the fishing industry would have been ideal but at the time I had no relevant skills other than being reasonably good at catching carp, and the market was already saturated with passionate fisherman with the same "pipe dream".
                    I did not connect with my A level subjects either, so I was/am very thankful for finding a new hobbie that I could also do as a job.
                </p>
                <p>This page explains in detail how I accidently discovered programming and what motivated me to continually pursue new skills and knowledge and improve upon what I had already created.
                    It is also a story that geeks and hackers may relate to or find interesting.
                    This page may seem irrelevant, but I can't emphasise enough the advantages my experiences programming on MSN Chat gave me when I was studying at university and working for Prophet.
                    I had gained 5 years of solid programming experience including writing 1000's of publically released code as well as tutorials, and naturally developed my analytical, problem solving and investigative mindset.
                    It also taught me a lot about human behaviour.
                </p>
            </SegmentDemo>

            <SegmentDemo heading="Discovering MSN Chat">
                <p>When I was 16 my father bought me a PC with the Windows 98 OS installed and a 56k modem for the purpose of aiding me in my A level work and studies.
                    I had previously used online chat rooms whilst at my friends house to speak to the opposite sex and generally have fun.
                    Now I was armed with my own computer I decided to try this out again and after a quick google search for "UK chat rooms" I found MSN Chat.
                </p>
                <p>
                    <a href="https://en.wikipedia.org/wiki/MSN_Chat">MSN Chat</a> was a website that incorporated a directory listing of chat rooms (referred to as channels) that were split between specific topics (teen, computing, e.t.c.).
                    Once you had created an account you could then select a channel and join it to speak to people from all over the world via your Internet <a href="https://raw.githubusercontent.com/sidfishus/react-spa-demo/master/wwwroot/img/msn-webchat.png">browser</a>.
                    You could also create your own public channel which would make you the channel owner giving you additional digital powers such as the ability to set the chat room subject, and mute, kick and ban other chatters.
                    Channel owners in the nickname list had a golden hammer icon next to their name (ahh the memories).
                </p>
                <p>
                    It was difficult and time consuming to create a new channel and make it popular but I had found out that it was possible for multiple chatters to have channel owner access.
                    When you create a new channel a special password (owner key) was generated and placed in a specific location in the Windows registry.
                    With this knowledge I began social engineering unsuspecting channel owners in busy channels into telling me the owner key and I would then 'take over' the chat room by entering the '/pass &#60;owner key&#62;' command and quickly 'kick banning' the other owners.
                    Ridiculous I know, but at the humble age of 16 this was great fun!
                </p>
            </SegmentDemo>
            <SegmentDemo heading="The Turning Point">
                <p>
                    One day I entered a busy channel where everybody was an owner and I couldn't keep up with what was happening.
                    For example, all user's could be kicked out in an instant by one user but they would all instantly rejoin and sometimes make themself an owner and revoke the owner privileges of the user that kicked them, seemingly like an automated response.
                    I remember being frustrated for having to continually refresh my browser in order to rejoin after being kicked, and finding I was no longer an owner when attempting to kick the other users.
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
                <p>This was great fun for a while but IRC Dominator had it's imperfections and I still felt limited.
                    I was hearing more and more about what you could achieve with scripts and a lot of the information was going over my head at the time.
                    After lots of begging and some failed attempts I managed to talk someone in to sending me a working 'script' which consisted of an application called <a href="https://www.mirc.co.uk/">mIRC</a> and various text files.
                    As per my new best friend's advice, I ran the mIRC.exe and typed a number of commands into a prompt which included the same cookie approach as IRC Dominator and lastly typed "/join %#&lt;name of channel&gt;"" and hit enter.
                    Something positive seemed to be happening as large swathes of jargon in cool colours and ASCII art scrolled down the screen until a seperate window inside mIRC opened up which appeared to be a representation of the channel I had wished to join but in a mIRC user interface.
                    I was logged in to the same channel via my browser and I noticed that the second user account I was using specifically within mIRC had indeed joined and could send and receive chat room events.
                    Yes! I had finally successfully connected via a script!
                </p>
            </SegmentDemo>
            <SegmentDemo heading="Scripting">
                <p>
                    I still didn't understand why this was called a script but I dove straight into finding what new features I had gained and making sense of how this all worked.
                    Similar to a web browser session, right clicking a user in the 'nick list' window opened a typical Windows context menu with a whole host of commands that you could apply to that user.
                    And additionally right clicking in the channel window brought up another context menu with another list of commands such as 'null take', 'mass kick', 'mass ban', 'mass deowner'.
                    I was also told by the user who sent me the script that there were also a number of 'aliases' available, which were commands you could type preceded by a '/'.
                    And apparently all of this was completely customiseable.
                </p>
                <p>
                    After doing some investigation in to this mIRC I found that it had a built in text editor like notepad and the ability to add and edit text files. 
                    There was already a number of text files loaded into mIRC and I spent some time skimming through them.
                    One of the aliases (/scroller &lt;text&gt;) I had been told about would repeat the specified text as messages with an increasing number of asterixes.
                    Whilst reading the text files I came across the line "alias scroller &123;" and the cogs in my adolescent brain starting turning - had I found the essence of the scroller command?
                    I copied and pasted the code which seemed to encompass the scroller command but changed the top line to "alias scroller2 &123;", and changed the '10' to a '5' (the original would scroll the text 10 times).
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
                    Understanding how and being able to connect mIRC to MSN Chat was key to having an edge over the other scripters I was competing against.
                </p>
                <p>
                    mIRC out of the box worked seemlessly with standard IRCx and IRCd type TCP/IP servers (the 2 types that I remember having used) and MSN Chat was IRCx based, however it had a number of additional features and nuances such as authentication that mIRC did not support directly.
                    Rather than using the standard mIRC '/server &lt;IP&gt; &lt;port;&gt;' command to connect directly to MSN Chat (which would fail), the connection and traffic between the mIRC client and the MSN Chat network had to be manually scripted and the packets manually manipulated.
                    The first part was to create a proxy connection to the mIRC client which is achieved by creating a local server using the '/socklisten &lt;socket name&gt; &lt;port&gt;' command, and then a '/server 127.0.0.1 &lt;port&gt;' command.
                    The second step was to create a connection to the relevant MSN Chat server via the '/sockopen &lt;socket name&gt; &lt;IP&gt; &lt;port&gt;' command and handle the initialisation and authentication yourself in the mIRC script.
                    Then for example to join a channel, you would enter '/join &lt;channel;&gt;' into the mIRC server window for which the local connection/proxy would receive via a 'socket read', and then forward it on to the MSN Chat server using the relevant IRCx/MSN Chat protocol via a 'socket write'.
                    If the join request was successful, you would then receive a number of packets in the MSN Chat socket connection and these were parsed, manipulated under the circumstances where mIRC did not support a command, and forwarded on to the local proxy/mIRC connection.
                    When the mIRC client receives the packets, the built in functionality would be triggered and behave as though it was connected directly to MSN Chat, which involved opening a new window for the channel, populating the nickname list, and showing the current topic.
                </p>
                <p>        
                    To learn all of this I began methodically stepping through the connection I was using at the time
                    (named QuickChat and by a scripter named 'Cyborg' who I eventually became friends with), and using the mIRC 'echo' command
                    to debug trace the packets.
                    There were 2 separate MSN Chat connections involved, a connection to a fixed IP referred to as the "directory server" in this
                    script, and a separate connection to the chat server.
                    There were 8 chat servers at the time which was later extended to 10 servers, and a given channel was hosted on one
                    of these servers and accessed directly.
                    It was the purpose of the "directory server" to tell clients the specific IP a channel was on which was achieved
                    via a 'FINDS' command, as well as provide a command to create a new channel.
                </p>

                <p>
                    In order to successfully connect to the servers you had to go through a complex 2 part authentication process.
                    //sidtodo here

                    Authentication was the most complex aspect and consisted of 2 parts.
                    The first part was an 8 character challenge string and in order to gain the answer you had to create a hidden browser window within mIRC and embed the chat ActiveX control within it.
                    The second part involved sending the MSN passport cookies which had to be regenerated every 24 hours that I was already in the habit of doing.
                </p>

                <p>
                    As my knowledge increased I rewrote many parts of QuickChat until I felt confident enough to start from scratch.
                    With this understanding I wrote my own connection in which I named "r00t" and released to the public via a popular mIRC scripting site at the time.
                    I couldn't resist the temptation to add a hidden backdoor which meant I would automatically be given owner access whenever I joined a channel with an owner user using my script ;-).
                </p>

                <p>
                    ROOt connection was quite well received but it didn't stand out at the time, there was nothing special about it.
                    Scripters were fixated with speed, if you were faster than everyone else at anything then you were considered "elite".
                    For example we used to write "deowner" protection so that we could react as quickly as possible to having our channel ownership removed to prevent channel take overs.
                    For some reason we were under the illusion that the more complicated we could make this the quicker we would react and would go to great lengths!
                    Joining a channel would incur a lag of at least 1 second due to having to determine which server a channel was on and then connect a socket to that server.
                    I had the idea of using pre-connected sockets: upon opening mIRC, the connection script would create a socket to each of the 8 servers and leave them idle.
                    Joining a channel was then a case of sending a "JOIN %#&lt;Channel&gt;" to each of the pre-connected sockets simulataneously, and the relevant one would give you access.
                    Voila instant connection!
                    I released this connection as "Direx" and it was very popular.
                    Again I couldn't help but add a backdoor which I used on a number of occasions to <a href="https://xt.proboards.com/thread/1017/connected-first?page=3">recapture</a> stolen channels.
                    There was an MSN Chat command "who" that you could use to search for chatters.
                    When my connection authenticated it sent a certain signature which could then be looked up using the "who" command.
                    In one hour I used this to mass find everyone connected using my script and promptly used the backdoor (ownership on entry) to take 50+ channels for fun (I returned the majority of them).
                </p>
            </SegmentDemo>
        </>
    );
};

const SplitBots: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Split Bots..">
            <p>
                Occasionally the chat servers would be rebooted for maintenance and when the server a given channel was on was rebooted ("split"), it gave you the opportunity to recreate it.
                There were a number of very popular chat rooms at the time (%#Somewhere, %#Hackers, %#Unknown) that different cliques/factions of users were always trying to own.
                The original MSN chat hackers had devised programs that would take advantage of whenever this happened by connecting 100's of sockets to the directory server and repeatedly sending the command to create a channel.
                If you were lucky enough to send the command at the exact right time you would be rewarded with the recreation of the channel and become the new owner.
            </p>
        </SegmentDemo>
    );
};

const VisualBasic: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Visual Basic">
            <p>
                By now I was well into my programming and looking to expand my skills.
                Visual Basic was a popular language among MSN Chat scripters so I decided to give it a go.
                Around this time I had a lot of holiday away from sixth form, and my dad would regularly drop me off fishing/camping for a week at a time.
                And so I bought an official book on VB and read it on my next fishing trip.
                This was the first time I had been introduced to data types and the Windows API.
                After I had returned from my trip I downloaded the Microsoft compiler/development environment and created some programs.
                This was easy enough but I didn't have the enthusiasm to write my own chat client in Visual Basic.
            </p>
        </SegmentDemo>
    );
};

const ChatActiveXControl: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Reverse Engineering the Authentication Algorithm">
            <p>
            The biggest hindrance to connecting to the chat service was the use of the ActiveX control, having to create a browser window with the OCX embedded per channel connection was slow and resource heavy and limited the amount of connections we could make at any one time.
            For the various types of bots we were using you could have up to 1000 sockets simultaneously connected to the chat network.
            </p>
            <p>
                Around this time one of my online friends gave me the source code to a Visual Basic program that could connect to MSN chat without having to use the MSN Chat OCX, however it only worked approximately 80% of the time.
                This was the absolute holy grail and was to my knowledge unheard of at the time!
                Apparently he had received it from a well known hacker at the time (AL..) who had reverse engineered the OCX and reproduced the challenge algorithm in VB, but was struggling to make it 100% successful.
            </p>
            <p>
                From memory the algorithm consisted of unpacking the challenge you receive from MSN from a string to an array of 8 bytes, appending it to a fixed string and running it through a MD5 checksum.
                The result of the checksum was then added to another fixed string and then MD5'd again.
                I noticed that only when the challenge contained "\0" would authentication fail.
                After digging in to the code I found it was treating the challenge as a C style string as opposed to an array of bytes and thus stripping out the part of the challenge after the \0 - \0 has a special meaning in strings (null terminator) and is used to mark the end of a string.
                Fixing this part of the code worked as I expected and now it would authenticate 100% of the time.
            </p>

            <p>
                I then reproduced the same algorithm in mIRC so we could use it in our connection scripts and circumvent any need for the OCX.
                Yes!! Me and my friends now had a definitive advantage over the competition!
            </p>
        </SegmentDemo>
    );
};

const CPlusPlus: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="C++">
            <p>
                On MSN Chat, if you could knowledge of C or C++ then you were "the man" and it gave you the bragging rights over lesser coders.
            </p>
            <p>
                By now I had learned that mIRC was relatively slow, and the more script loaded in to mIRC the slower it became.
                Also, the complex authentication challenge algorithm we were using was currently written in mIRC and could speed up connection time if moved outside of mIRC.
                Ideally I wanted to move as much of the mIRC code as possible to another programming language that was compiled but retain the mIRC client as a user interface.
            </p>
            <p>
                mIRC has the ability to call functionality from a DLL so I followed a tutorial on how to create a C++ mIRC DLL and did a proof of concept.
                Still having a lot of free time at my disposal, I bought a <a href="https://www.amazon.co.uk/Wileys-Teach-Yourself-Stevens-2003-04-04/dp/B01A65I12C">book on C++</a> and read it whilst fishing.
                This gave me enough of an understanding to recreate the challenge algorithm in a C++ DLL that could be called at will by mIRC.
            </p>

            <p>
                I then tried to move all of the mIRC connection script event handling code in to C++ and I utilised it by passing the MSN chat data received from the mIRC socket to a function in the DLL, and executing the result which was a list of mIRC commands.
                In retrospect now it would have been better to write a C++ program that I could send commands to from inside mIRC that did all of the socket connections including authentication, and so that mIRC only delt with the user interface.
            </p>

            <p>
                I also created a split bot as an executable written entirely in C++ which was another advantage because the majority of everyone else were using ones made in mIRC.
                //sidtodo find screenshot
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
                It sounds strange, but I almost get butterflies in my stomach when I think of those days.
                Randomly hearing one of the sound effects used within the original MSN Chat application will bring memories flooding back.
                Perhaps one day I'll have a go at recreating MSN Chat, not just another IRC network, but one that has that MSN Chat feel.
            </p>

            <p>I really could write a book about my experiences and exploits (maybe one day I will) and have very fond memories, long live MSN Chat.</p>
        </SegmentDemo>
    );
};