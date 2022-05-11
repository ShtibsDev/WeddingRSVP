namespace WeddingRSVP.Server.Data.Services;

public interface IInviteeService
{
    public Task<Invitee> GetInvitee(string phoneNumber);
    public Task<Invitee> SubmitRsvp(Invitee invitee);
    public Task<List<Invitee>> GetAllInvitees();
}
