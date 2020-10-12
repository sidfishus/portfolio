
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

const MSNChat: React.FunctionComponent<{}> = () => {
    
    return (
        <SegmentDemo heading="MSN Chat">
            <p>I find it very random and lucky how I stumbled across programming and this is a story a geek/hacker may find interesting or relate to.
                But feel free to skip this section.
            </p>
            <p>When I was 16 my father bought me a PC and set me up to connect to dial up 56k internet to help with my A levels and it was whilst browsing the internet one day that I discovered the MSN chat room service.
                The <a href="https://en.wikipedia.org/wiki/MSN_Chat">MSN Chat service</a> was a collection of chat rooms (channels) accessible via a <a href="https://raw.githubusercontent.com/sidfishus/react-spa-demo/master/wwwroot/img/msn-webchat.png">browser</a> where you could chat with people from all over the world.
                You could also create your own channel which would make you the channel owner and this would give you the additional powers of being able to set the chat room subject, mute, kick and ban other members.
            </p>
            <p>
                I found out that it was possible to make other people the channel owner, when you create a channel a special password (owner key) is generated and placed in the Windows registry.
                With this knowledge I started to social engineer unsuspecting users into giving me the owner key to their channels, which I could then use to make myself owner by using the '/pass' command and take over ownership of their chat room by banning them.
                Ridiculous I know, but I was 16 at the time and I found this a lot of fun!
            </p>

            <p>
                One day I entered a busy chat room where everyone in the channel was an owner, and were all doing things like "mass kicking" people out but they were instantly rejoining, as well as mass stealing the other chatters' ownership.
                I remember having to continually refresh my browser to re-enter the channel after being repeatedly kicked and not really understanding what was happening.
                Whatever it was, I wanted those abilities as well.
            </p>
            <p>
                After venturing into other channels and speaking to various people I found out that they were using "bots" and "scripts" and my reaction was "what - like a script to a play?".
                After lots of chatting I found a user who was connected to the channel using a "bot" called "<a href="https://raw.githubusercontent.com/sidfishus/react-spa-demo/master/wwwroot/img/ircdominator.gif">IRC Dominator</a>", which would give you access to a lot more functionality than if you connected via a browser.
                Not being backwards in being forward I quickly gleaned the information on how I could download it and how to setup.
                I followed the instructions, which involved pasteing "<a href="https://raw.githubusercontent.com/sidfishus/react-spa-demo/master/wwwroot/img/ircdom-cookies.jpg">cookies</a>" into the application (which I got from doing a 'view source' in a browser session) and then fired it up.
                Now this would take my channel stealing to the next level!
            </p>
            <p>This was fun for a while but I started to hear more and more about what you could achieve with scripts and be told things that were going over my head at the time.
                After lots of begging I managed to talk someone in to sending me a working "script".
                This consisted of an application called <a href="https://www.mirc.co.uk/">mIRC</a> and various other files.
                I executed the mIRC.exe and was told type "join %#&lt;name of channel&gt;"" into a command prompt type window.
                What followed then was a bunch of jargon scrolling down the screen until another window popped up that was a representation of the channel but through mIRC - I was in!
            </p>
            <p>
                I still didn't understand why this was called a "script" but I started to get to grips with my new found abilities.
                You could type various commands in to the channel window preceded by a /.
                After doing some investigation in to this mIRC I found that it had a built in text editor like notepad and the ability to view files that were loaded in to the application.
                One of the commands (/scroller) I was using gave you the ability the scroll messages on the screen with an increasing number of asterixes.
                Whilst reading the computer code in the text files I came across the line "alias scroller &123;" - the cogs in my brain ticked over - I had found the mechanism that dictates what the scroller command does!
                I copied and pasted this code but changed the top line to "alias scroller2 &123;", and changed the asterixes to another character.
                I then hit the /scroller2 command and it worked as expected! My first script.
                Apparently the text files were the "scripts" everyone was referring to and "scripting" was the process of writing script code.
            </p>

            <p>
                After progressing my scripting abilities and furthering my understanding of the relationship between mIRC and MSN Chat I went one step further and decided to attempt writing a "connection" script.
                mIRC has inbuilt functionality to connect to IRC servers (the Internet Relay Chat protocol MSN chat was based on) but MSN used it's own authentication processes which had to be manually scripted in order to gain access to the network.
                I.e. the connection between mIRC and MSN had to be manually scripted using the mIRC 'socket' feature (which I imagine was implemented using Winsock).
                To gain an understanding of how to do this I edited the connection script I was using at the time (named QuickChat), began stepping it through methodically and using the mIRC 'echo' command to give me an insight in to the data exchanges.
                There were 2 connections involved, a connection to a "directory" server, and a connection to the actual chat server.
                Sending a "finds" command whilst connected to the directory server would tell you which server a particular chat room was on as there were 8 of them.
            </p>

            <p>
                Authentication was the most complex aspect and consisted of 2 parts.
                The first part was an 8 character challenge string and in order to gain the answer you had to create a hidden browser window within mIRC and embed the chat ActiveX control within it.
                The second part involved sending the MSN passport cookies which had to be regenerated every 24 hours that I was already in the habit of doing.
            </p>

            <p>
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
                Perhaps one day I'll have a go at recreating MSN Chat, not just another IRC network, but one that has that MSN Chat feel.
            </p>
            
            <p>This probably all sounds irrelevant, but I can't emphasise enough the advantage this experience gave me when I went to university and first started working.
                I already had 5 years solid experience behind me and is how I developed my analytical, problem solving and investigative mindset.
            </p>

            <p>I really could write a book about my experiences and exploits (maybe one day I will) and have very fond memories, long live MSN Chat.</p>
        </SegmentDemo>
    );
};