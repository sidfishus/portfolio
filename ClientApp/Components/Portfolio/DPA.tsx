
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase } from "./PortfolioBase";

export interface IDPAPortfolioProps extends IRoutedCompProps {
};

export const DPAPortfolio: React.SFC<IDPAPortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            about={About()}
            aboutHeading="Distributed SPA"
        />
    );
};

const About: any = () => {
    return (
<>
<p>A distributed isomorphic React single page application (SPA) hosted via .NET MVC Core 2.2 with seperate client, API, and identity server applications.</p>
<p>The purpose of this is to provide a template for modern clientside web applications. Developed using Chrome, and tested on IE and Edge browsers. Developed using the Microsoft Visual Code IDE and includes integrated build and debugging tasks.</p>
<p>There is a video by the Identity Server 4 creators which is available on YouTube that describes authentication and the distributed model used in this project: <a href="https://www.youtube.com/watch?edufilter=NULL&amp;v=eF2myGRT8bo" rel="nofollow">https://www.youtube.com/watch?edufilter=NULL&amp;v=eF2myGRT8bo</a>.</p>
<p>The 3 applications are split between 4 code projects:</p>
<h3>Client</h3>
<p>A modern Javascript React SPA which calls a protected external web API. When not logged in the application redirects the user to the identity server for authentication. Incorporates a .NET and Node JS server backend, and a Javascript client application.</p>
<p>Features:</p>
<ul>
<li>ASP .NET MVC Core 2.2 for hosting the static front end files.</li>
<li>Server side pre-rendering by leveraging the Microsoft SPA Services and Node JS.</li>
<li>Webpack and Babel for transpiling and bundling Javascript files, and includes the object spread syntax plugin.</li>
<li>React version 16.12.</li>
<li>Hot module replacement (web pages reload upon changes to the code) provided by the React hot loader (<a href="https://github.com/gaearon/react-hot-loader">https://github.com/gaearon/react-hot-loader</a>) and Microsoft SPA services.</li>
<li>Flow (<a href="https://flow.org/" rel="nofollow">https://flow.org/</a>) for static type checking.</li>
<li>Interfaces with the identity server via the OIDC Javascript client provided by Identity Server 4.</li>
<li>React UI theme and controls provided by React Bootstrap: (<a href="https://react-bootstrap.github.io/" rel="nofollow">https://react-bootstrap.github.io/</a>).</li>
<li>React router for client-side routing and navigation.</li>
<li>Axios for asynchronous web requests.</li>
<li>No Redux but this would be simple to add.</li>
<li>Babel and core-js Javascript polyfills for use with older browsers.</li>
</ul>
<p>To build:</p>
<ul>
<li>Use the integrated build tasks.</li>
</ul>
<p>To execute:</p>
<ul>
<li>'dotnet run' within a command prompt window.</li>
</ul>
<p>To debug:</p>
<ul>
<li>Use the 'Client' debug task to debug the .NET server side code.</li>
<li>To debug the server side Javascript code you can use the dedicated tools for Node inside the Chrome browser 'chrome://inspect' feature.</li>
<li>The client-side code can be debugged within the browser. The application features code mapping (via Webpack) that allows the original source code (not the final transpiled version) to be stepped.</li>
</ul>
<h3>API</h3>
<p>A .NET MVC Core web API application that includes a test controller and a protected API method which can only be accessed by an authenticated user with a 'IsAdmin' claim. This project features no client-side code.</p>
<p>Features:</p>
<ul>
<li>ASP .NET MVC Core 2.2.</li>
<li>Bearer authentication provided by Identity Server 4.</li>
</ul>
<p>To build:</p>
<ul>
<li>Use the integrated build tasks.</li>
</ul>
<p>To execute:</p>
<ul>
<li>'dotnet run' within a command prompt window.</li>
<li>Use the 'API' debug task.</li>
</ul>
<p>To debug:</p>
<ul>
<li>Use the 'API' debug task to debug this.</li>
</ul>
<h3>IdentityServer</h3>
<p>A .NET MVC Core web application which provides authentication and authorisation to the rest of the application via Identity Server 4 (<a href="http://docs.identityserver.io/en/latest/" rel="nofollow">http://docs.identityserver.io/en/latest/</a>). Login and consent is captured via a Javascript React SPA.</p>
<p>Features:</p>
<ul>
<li>ASP .NET MVC Core 2.2.</li>
<li>Server side pre-rendering by leveraging the Microsoft SPA Services and Node JS.</li>
<li>Entity Framework for identity server storage.</li>
<li>Microsoft Sqlite as the underlying database technology.</li>
<li>Semantic UI React UI theme and controls.</li>
<li>Typescript for static type checking and integration with Webpack/Babel.</li>
<li>Webpack and Babel for compiling and bundling Javascript files which includes the object spread syntax plugin.</li>
<li>React version 16.12.</li>
<li>Hot module replacement as per the client application.</li>
<li>Axios as per the client application.</li>
<li>Babel and core-js Javascript polyfills for use with older browsers.</li>
</ul>
<p>To build:</p>
<ul>
<li>Use the integrated build tasks.</li>
</ul>
<p>To execute:</p>
<ul>
<li>'dotnet run' within a command prompt window.</li>
</ul>
<p>To debug:</p>
<ul>
<li>Use the 'IdentityServer' debug task to debug the .NET server side code.</li>
<li>You can use Chrome to debug the server side Javascript code as per the client application.</li>
<li>The client-side Javascript code can be debugged using the browser as per the client application.</li>
</ul>
<h3>Shared</h3>
<p>This contains C# code that is shared between the projects.</p>
<h3>Initial Setup</h3>
<ul>
<li>The database used in the Identity Server project must be created and seeded. To do this, within a command prompt window navigate to the IdentityServer sub directory, and run the following commands:
<ul>
<li>'dotnet ef migrations add InitialCreate'</li>
<li>'dotnet ef database update'</li>
</ul>
</li>
<li>As part of seeding the database an administrator user will be created with a random password. In order to login to the application you will require this password. This password can be viewed by opening the Identity Server database file 'AspIdUsers.db' and finding the 'header' table, inside here will be a single row that has a column named 'DefaultAdminPassword'. To view the contents of the database you can use an application named 'DB Browser for Sqlite': <a href="https://sqlitebrowser.org/" rel="nofollow">https://sqlitebrowser.org/</a>. Once the password is known, this row can be deleted from the database.</li>
<li>URL's to the 3 applications are held in URLs.cs and mirrored in URLs.js: change these accordingly but it will work as-is for development purposes (as long as the ports are not already in use).</li>
<li>You may receive errors when contacting the API relating to a network error or SSL certificates when running it from a development machine. I found the following helpful in resolving this: <a href="https://medium.com/@ali.dev/how-to-trust-any-self-signed-ssl-certificate-in-ie11-and-edge-fa7b416cac68" rel="nofollow">https://medium.com/@ali.dev/how-to-trust-any-self-signed-ssl-certificate-in-ie11-and-edge-fa7b416cac68</a>.</li>
</ul>
<h3>Application Default URL</h3>
<p>When the client, IdentityServer, and API server applications are running, the client application can be accessed via <a href="http://localhost:5000/home" rel="nofollow">http://localhost:5000/home</a>.</p>
</>
    );
};