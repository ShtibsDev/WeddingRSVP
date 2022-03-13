using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using WeddingArrival.Data.Services;
using WeddingArrival.Services;

namespace WeddingArrival;

public class Startup
{

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;

    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllersWithViews();

        services.Configure<DatabaseSettings>(Configuration.GetSection("WeddingArrivalsDB"));
        services.AddSingleton<IInviteeService, InviteeService>();
        // In production, the React files will be served from this directory
        services.AddSpaStaticFiles(configuration => {
            configuration.RootPath = "ClientApp/build";
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        Log.Information("Application Environment: {env}", env.EnvironmentName);
        if (env.IsDevelopment()) {
            app.UseDeveloperExceptionPage();
        }
        else {
            app.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseSpaStaticFiles();

        if (!env.IsDevelopment()) {
            app.UseWebSockets();
        }

        app.UseRouting();

        app.UseEndpoints(endpoints => {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "api/{controller}/{action=Index}/{id?}");
        });

        app.UseSpa(spa => {
            spa.Options.SourcePath = "ClientApp";

            if (env.IsDevelopment()) {
                spa.UseReactDevelopmentServer(npmScript: "start");
            }
        });
    }
}
