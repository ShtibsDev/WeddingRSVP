﻿using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WeddingRSVP.Server.Data.Services;
using WeddingRSVP.Server.Exceptions;

namespace WeddingRSVP.Server.Services;

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
        EvaluateResponse(invitee);
        invitee.Group?.ForEach(member => EvaluateResponse(member));
        var dbInvitee = await _inviteeCollection.Find(i => i.Id == invitee.Id).FirstOrDefaultAsync();
        await _inviteeCollection.ReplaceOneAsync(i => i.Id == invitee.Id, invitee);
    }

    private static void EvaluateResponse(Invitee invitee)
    {
        switch (invitee.Response) {
            case ResponseType.Coming:
                invitee.IsArriving = true;
                invitee.IsStayingForNight = false;
                return;
            case ResponseType.StayingTheNight:
                invitee.IsArriving = true;
                invitee.IsStayingForNight = true;
                return;
            case ResponseType.NotComing:
                invitee.IsArriving = false;
                invitee.IsStayingForNight = false;
                return;
            default:
                invitee.IsArriving = null;
                invitee.IsStayingForNight = null;
                return;
        }
    }
}
