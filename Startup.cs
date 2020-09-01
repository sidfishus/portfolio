using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;

namespace react_spa
{
    public class Startup
    {
        IWebHostEnvironment m_HostingEnvironment;

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            m_HostingEnvironment=environment;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddControllersWithViews()
                .AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);

            // For debugging server side javascript via Node
            services.AddNodeServices(options =>
            {
                if (m_HostingEnvironment.IsDevelopment())
                {
                    options.InvocationTimeoutMilliseconds=1000000;
                    options.LaunchWithDebugging = true;
                    options.DebuggingPort = 9250;
                }
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                // Replaces the 'URL rewrite' functionality in IIS and is necessary for clientside navigation to work
                endpoints.MapFallbackToController("Index", "Home");
            });
        }
    }
}
