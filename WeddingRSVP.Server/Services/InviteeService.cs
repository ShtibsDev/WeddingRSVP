using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WeddingRSVP.Server.Data.Services;

namespace WeddingRSVP.Server.Services;

public class InviteeService : IInviteeService
{
    private readonly IMongoCollection<Invitee> _inviteeCollection;
    private readonly Serilog.ILogger _looger;

    public InviteeService(IOptions<DatabaseSettings> dbSettings, Serilog.ILogger looger)
    {
        _looger = looger;


        try {
            _looger.Verbose("Establishing connection to database.");
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _inviteeCollection = mongoDatabase.GetCollection<Invitee>(dbSettings.Value.InviteesCollectionName);
            _looger.Verbose("Successfully established databse connection.");
        }
        catch (Exception) {
            _looger.Error("Unable to Connect to database");
        }
    }

    public async Task<Invitee> GetInvitee(string phoneNumber)
    {
        var invitee = await _inviteeCollection.Find(i => i.PhoneNumber == phoneNumber).FirstOrDefaultAsync();
        if (invitee is null) {
            _looger.Warning("Invitee with phone number {PhoneNumber} was not found", phoneNumber);
        }
        else {
            _looger.Debug("Found Invitee: {@Invitee}", invitee);
        }
        return invitee;
    }

    public async Task<Invitee> SubmitRsvp(Invitee invitee)
    {
        EvaluateResponse(invitee);
        invitee.Group?.ForEach(member => EvaluateResponse(member, invitee));
        var dbInvitee = await _inviteeCollection.Find(i => i.Id == invitee.Id).FirstOrDefaultAsync();
        await _inviteeCollection.ReplaceOneAsync(i => i.Id == invitee.Id, invitee);
        invitee.Group?.ForEach(async (member) => await _inviteeCollection.ReplaceOneAsync(i => i.Id == member.Id, member));
        return invitee;
    }

    public async Task<Invitee> ResetSubmition(string id)
    {
        var invitee = await _inviteeCollection.Find(i => i.Id == id).FirstOrDefaultAsync();
        invitee.Response = ResponseType.None;
        invitee.GroupCount = 0;
        EvaluateResponse(invitee, setSubmitting: false);
        invitee.Group?.ForEach(member => {
            member.Response = ResponseType.None;
            EvaluateResponse(member, setSubmitting: false);
        });
        return invitee;
    }

    public async Task<List<Invitee>> GetAllInvitees()
    {
        return await _inviteeCollection.Find(_ => true).ToListAsync();
    }

    private static void EvaluateResponse(Invitee invitee, Invitee mainInvitee = null, bool setSubmitting = true)
    {
        invitee.SubmittingInvitee = setSubmitting ? Clone(mainInvitee ?? invitee) : null;

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

    private static Invitee Clone(Invitee invitee)
    {
        return new Invitee {
            AllowNight = invitee.AllowNight,
            FirstName = invitee.FirstName,
            LastName = invitee.LastName,
            Id = invitee.Id,
            IsArriving = invitee.IsArriving,
            IsStayingForNight = invitee.IsStayingForNight,
            IsBringsPlusOne = invitee.IsBringsPlusOne,
            IsMale = invitee.IsMale,
            Lang = invitee.Lang,
            PhoneNumber = invitee.PhoneNumber,
            Response = invitee.Response
        };
    }
}
