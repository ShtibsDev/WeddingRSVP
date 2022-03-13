namespace WeddingArrival.Data.Services;

public interface IInviteeService
{
    public Task<Invitee> GetInvitee(string phoneNumber);
    public Task SubmitRsvp(Invitee invitee);
    public Task<List<Invitee>> GetAllInvitees();
}
