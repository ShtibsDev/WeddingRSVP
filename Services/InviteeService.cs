using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WeddingArrival.Data.Services;
using WeddingArrival.Exceptions;

namespace WeddingArrival.Services;

public class InviteeService : IInviteeService
{
    private readonly IMongoCollection<Invitee> _inviteeCollection;
    private readonly ILogger<InviteeService> _looger;

    public InviteeService(IOptions<DatabaseSettings> dbSettings, ILogger<InviteeService> looger)
    {
        _looger = looger;

        _looger.LogTrace("Establishing connection to database.");
        var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
        _inviteeCollection = mongoDatabase.GetCollection<Invitee>(dbSettings.Value.InviteesCollectionName);
        _looger.LogTrace("Successfully established databse connection.");
    }

    public async Task<Invitee> GetInvitee(string phoneNumber)
    {
        return await _inviteeCollection.Find(i => i.PhoneNumber == phoneNumber).FirstOrDefaultAsync();
    }

    public async Task<List<Invitee>> GetAllInvitees()
    {
        return await _inviteeCollection.Find(_ => true).ToListAsync();
    }

    public async Task SubmitRsvp(Invitee invitee)
    {
        var dbInvitee = await _inviteeCollection.Find(i => i.Id == invitee.Id).FirstOrDefaultAsync();
        if (dbInvitee.IsFinal) {
            _looger.LogError("Invitee: {InviteeName} with phone number: {PhoneNumber} has tried to submit twice", $"{invitee.FirstName} {invitee.LastName}", invitee.PhoneNumber);
            throw new PreviouslySubmitedException();
        }

        await _inviteeCollection.ReplaceOneAsync(i => i.Id == invitee.Id, invitee);
    }
}
