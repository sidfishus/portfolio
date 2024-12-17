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

namespace react_spa
{
    public class Startup
    {
        const string ViteCorsPolicy="ViteCorsPolicy";
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
            
#if DEBUG
            services.AddCors(options =>
            {
                // Required when debugging the SPA using Vite.
                options.AddPolicy(name: ViteCorsPolicy,
                    policy  =>
                    {
                        policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
                    });
            });
#endif
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
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
            
#if DEBUG
            app.UseCors(ViteCorsPolicy);
#endif

            app.UseEndpoints(endpoints =>
            {
                // Replaces the 'URL rewrite' functionality in IIS and is necessary for clientside navigation to work
                endpoints.MapFallbackToController("Index", "Home");
            });
        }
    }
}
