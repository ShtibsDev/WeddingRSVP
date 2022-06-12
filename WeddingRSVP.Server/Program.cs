using MongoDB.Bson.Serialization.Conventions;
using WeddingRSVP.Server.Data.Services;
using WeddingRSVP.Server.Services;



var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options => options.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddControllers();
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("WeddingArrivalsDB"));
builder.Services.AddSingleton<IInviteeService, InviteeService>();

builder.Host.UseSerilog((context, logConfig) => logConfig.ReadFrom.Configuration(context.Configuration)
#if !DEBUG
    .WriteTo.AzureAnalytics(workspaceId: "08182fd1-cf64-4039-afdc-a7fe9bec4fd9", authenticationId: "9t8M8V4NYt66Oe+JmvTwY+KVUmcVNQNIAU3Bb5koGsE0XIfJF/60rUCGox1wo918qn/+FObv4ZL0bhK20ebtUg==")
#endif
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
try {

    var app = builder.Build();
    Log.Information("Application Environment: {env}", app.Environment.EnvironmentName);


    if (app.Environment.IsDevelopment()) {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseCors();
    app.UseAuthorization();
    app.MapControllers();

    Log.Information("Starting Web Host");
    Console.OutputEncoding = System.Text.Encoding.UTF8;
    app.Run();
}
catch (Exception ex) {
    Log.Fatal(ex, "Application crushed.");
}
finally {
    Log.CloseAndFlush();
}
