namespace WeddingRSVP.Server.Exceptions;

public class PreviouslySubmitedException : Exception
{
    public PreviouslySubmitedException() : base("Invitee has already submited their response") { }
}