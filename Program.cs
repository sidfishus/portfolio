using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

const string viteCorsPolicy = "ViteCorsPolicy";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

#if DEBUG
builder.Services.AddCors(options =>
{
    // Required when debugging the SPA using Vite.
    options.AddPolicy(name: viteCorsPolicy,
        policy  =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
        });
});
#endif

var app = builder.Build();

app.UseHsts();
app.UseHttpsRedirection();

#if DEBUG
app.UseCors(viteCorsPolicy);
#endif

bool isApiContext(HttpContext ctx) => ctx.Request.Path.StartsWithSegments("/api");

app.MapWhen(ctx => !isApiContext(ctx), client =>
{
    client.UseRouting();
    client.UseStaticFiles();
    // Replaces the 'URL rewrite' functionality in IIS and is necessary for clientside navigation to work
    client.UseEndpoints(endpoints =>
    {
        endpoints.MapFallbackToFile("prodindex.html");
    });
});
        
app.MapWhen(ctx => isApiContext(ctx), api =>
{
    api.UseRouting();
    api.UseEndpoints(endpoints => endpoints.MapControllers());

    //api.UseStaticFiles(new StaticFileOptions
    //{
    //    FileProvider = new PhysicalFileProvider(Path.Combine(storageSettings.RootDir!)),

    //    RequestPath = "/api/storage"
    //});
});

app.Run();

/*
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
        
        
#if DEBUG
        app.UseCors(ViteCorsPolicy);
#endif

        app.MapWhen(ctx => !IsApiContext(ctx), client =>
        {
            client.UseRouting();
            client.UseStaticFiles();
            // Replaces the 'URL rewrite' functionality in IIS and is necessary for clientside navigation to work
            client.UseEndpoints(endpoints =>
            {
                endpoints.MapFallbackToFile("prodindex.html");
            });
        });
        
        app.MapWhen(ctx => IsApiContext(ctx), api =>
        {
            api.UseRouting();
            api.UseEndpoints(endpoints => endpoints.MapControllers());

            //api.UseStaticFiles(new StaticFileOptions
            //{
            //    FileProvider = new PhysicalFileProvider(Path.Combine(storageSettings.RootDir!)),

            //    RequestPath = "/api/storage"
            //});
        });*/