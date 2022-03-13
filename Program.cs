using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System.IO;

namespace WeddingArrival;

public class Program
{
    public static IConfiguration Configuration { get; } = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
    .AddJsonFile($"appsettings.{Environment.MachineName}.json", optional: true)
    .AddEnvironmentVariables()
    .Build();

    public static void Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(Configuration).CreateLogger();

        try {
            Log.Information("Starting Web Host");
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            CreateHostBuilder(args).Build().Run();
        }
        catch (Exception ex) {
            Log.Fatal(ex, "Application crushed.");
        }
        finally {
            Log.CloseAndFlush();
        }

    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
                   .UseSerilog()
                   .ConfigureWebHostDefaults(webBuilder => {
                       webBuilder.UseStartup<Startup>();
                   });
    }
}
