using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WeddingRSVP.Server.Models;

public class Invitee
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Lang { get; set; }
    public bool AllowNight { get; set; }
    public ResponseType Response { get; set; }
    public bool? IsArriving { get; set; }
    public bool? IsStayingForNight { get; set; }
    public bool? IsBringsPlusOne { get; set; }
    public bool IsMale { get; set; }
    public List<Invitee> Group { get; set; }
    public Invitee SubmittingInvitee { get; set; }
}
