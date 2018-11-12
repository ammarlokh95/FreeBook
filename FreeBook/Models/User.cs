using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FreeBook.Models
{
    public class User
    {
        public ObjectId id { get; set; }
        [BsonElement("firstname")]
        public string firstname { get; set; }
        [BsonElement("lastname")]
        public string lastname { get; set; }
        [BsonElement("username")]
        public string username { get; set; }
        [BsonElement("password")]
        public string password { get; set; }
        [BsonElement("joinDate")]
        public DateTime joinDate { get; set; }
        [BsonElement("friends")]
        public Dictionary<string,Boolean> friends;
        [BsonElement("friendRequests")]
        public List<string> friendRequests;
    }
}