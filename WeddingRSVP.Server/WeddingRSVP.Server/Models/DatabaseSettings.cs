namespace WeddingRSVP.Server.Models;

public class DatabaseSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string InviteesCollectionName { get; set; } = null!;
}
