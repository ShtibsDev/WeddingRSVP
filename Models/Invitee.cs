namespace WeddingArrival.Models
{
    public class Invitee
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Lang { get; set; }
        public bool? IsArriving { get; set; }
        public bool? IsStayingForNight { get; set; }
        public bool IsBringsPlusOne { get; set; }
        public bool IsGroup { get; set; }
        public bool IsMale { get; set; }
        public bool IsFinal { get; set; }
        public List<Invitee> Group { get; set; }
    }
}
