using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.Webpack;

namespace react_spa
{
    public class Startup
    {

        public IHostingEnvironment Environment { get; }

        public Startup(IHostingEnvironment environment,IConfiguration configuration)
        {
            Environment = environment;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // For debugging server side javascript via Node
            services.AddNodeServices(options =>
            {
                if (Environment.IsDevelopment())
                {
                    options.InvocationTimeoutMilliseconds=1000000;
                    options.LaunchWithDebugging = true;
                    options.DebuggingPort = 9250;
                }
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // 'npm install webpack-dev-middleware' is required for this
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    // See: https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.spaservices.webpack.webpackdevmiddlewareoptions.reacthotmodulereplacement?view=aspnetcore-2.2
                    // 'npm install --save-dev aspnet-webpack-react' is required for this
                    ReactHotModuleReplacement = true,
                    // Key - corresponds with the path in webpack module.exports output.publicPath
                    // 'npm install --save-dev aspnet-webpack' is required for this
                    HotModuleReplacementEndpoint = "/wwwroot/__webpack_hmr"
                });
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                // Doesn't appear to be needed?
                // routes.MapRoute(
                //     name: "default",
                //     template: "{controller=Home}/{action=Index}/{id?}"
				// );

                // Replaces the 'URL rewrite' functionality in IIS and is necessary for clientside navigation to work
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
