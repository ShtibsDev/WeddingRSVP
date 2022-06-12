using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WeddingRSVP.Server.Models;

public class Invitee
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonElement("firstName")]
    public string FirstName { get; set; }
    [BsonElement("lastName")]
    public string LastName { get; set; }
    [BsonElement("phoneNumber")]
    public string PhoneNumber { get; set; }
    [BsonElement("lang")]
    public string Lang { get; set; }
    [BsonElement("allowNight")]
    public bool AllowNight { get; set; }
    [BsonElement("response")]
    public ResponseType Response { get; set; }
    [BsonElement("isArriving")]
    public bool? IsArriving { get; set; }
    [BsonElement("isStayingForNight")]
    public bool? IsStayingForNight { get; set; }
    [BsonElement("isBringsPlusOne")]
    public bool? IsBringsPlusOne { get; set; }
    [BsonElement("isMale")]
    public bool IsMale { get; set; }
    [BsonElement("isPlusOne")]
    public bool IsPlusOne { get; set; }
    [BsonElement("group")]
    public List<Invitee> Group { get; set; }
    [BsonElement("submittingInvitee")]
    public Invitee SubmittingInvitee { get; set; }
    [BsonElement("isSimpleCount")]
    public bool? IsSimpleCount { get; set; }
    [BsonElement("groupCount")]
    public int GroupCount { get; set; }
    [BsonElement("sentRsvp")]
    public bool SentRsvp { get; set; } 
}
