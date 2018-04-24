using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApplication2.Models
{
    public class Status
    {
        public ObjectId Id { get; set; }
        [BsonElement("username")]
        public string username { get; set; }
        //[BsonElement("statusID")]
        //public int statusID { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime postDate { get; set; }
        [BsonElement("message")]
        public string message { get; set; }
    }
}