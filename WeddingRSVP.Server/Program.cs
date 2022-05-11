using WeddingRSVP.Server.Data.Services;
using WeddingRSVP.Server.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddDefaultPolicy(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddControllers();
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("WeddingArrivalsDB"));
builder.Services.AddSingleton<IInviteeService, InviteeService>();
builder.Host.UseSerilog((context, logConfig) => logConfig.ReadFrom.Configuration(context.Configuration));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
try {

    var app = builder.Build();
    Log.Information("Application Environment: {env}", app.Environment.EnvironmentName);
    Log.Information("Listening on: {ip}", app.Environment.WebRootPath);


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
