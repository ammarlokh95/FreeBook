using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using WebApplication2.AppExceptions;
using WebApplication2.Helper;
namespace WebApplication2.Models
{

    public class DataAccess
    {
        MongoClient _client;
        IMongoDatabase _db;

        public DataAccess()
        {
            _client = new MongoClient("mongodb://localhost:27017");
            _db = _client.GetDatabase("myappdatabase");
        }

        public IEnumerable<Status> GetAllStatus()
        {
            var list = _db.GetCollection<Status>("Status").Find(_ => true).Sort("{ postDate: -1 }").ToList();
            return list;
        }
        public IEnumerable<Status> GetAllStatusSince(DateTime date)
        {
            var filter = Builders<Status>.Filter.Gt("postDate", date);
            var list = _db.GetCollection<Status>("Status").Find(filter).Sort("{ postDate: -1 }").ToList();
            return list;
        }
        public void PostStatus(Status s)
        {
            var col = _db.GetCollection<Status>("Status");
            col.InsertOne(s);
        }
        /* public Status GetStatus(ObjectId id)
         {
             return _db.GetCollection<Product>("Products").Find
         }
         */
        public void RegisterNewUser(User ui)
        {
            Debugger da = new Debugger();
            da.Log(ui.ToJson());
            var col = _db.GetCollection<User>("User");
            var filter = Builders<User>.Filter.Eq("username", ui.username);

            if (col.Find<User>(filter).Count() == 0)
            {
                col.InsertOne(ui);
            }
            else throw (new UserNameExistsException("Username Exists!"));
        }

        public User LoginUser(string username, string password)
        {
            var builder = Builders<User>.Filter;
            var filters = builder.Eq("username", username) & builder.Eq("password", password);
            var col = _db.GetCollection<User>("User");
            if (col.Find<User>(filters).Count() == 1)
                return col.Find<User>(filters).First<User>();
            else throw (new UserNameDoesNotExistException("Username or Password does not match"));
        }
        public User GetUserByUsername(string username)
        {
            var builder = Builders<User>.Filter;
            var filters = builder.Eq("username", username);
            var col = _db.GetCollection<User>("User");
            if (col.Find<User>(filters).Count() == 1)
                return col.Find<User>(filters).First<User>();
            else throw (new UserNameDoesNotExistException("Username not found"));
        }
        public IEnumerable<Status> GetAllStatusOfUser(string username)
        {
            var builder = Builders<Status>.Filter;
            var filters = builder.Eq("username", username);
            var col = _db.GetCollection<Status>("Status");
            List<Status> list;
            if (col.Find<Status>(filters).Count() > 0)
                list = col.Find<Status>(filters).Sort("{ postDate: -1 }").ToList();
            else list = null;
            return list;
        }

        public void AddFriend(string username, string fusername)
        {
            var builder = Builders<User>.Filter;
            var filter1 = builder.Eq("username", username);
            var filter2 = builder.Eq("username", fusername);
            var col = _db.GetCollection<User>("User");
            try
            {
                var user1 = col.Find<User>(filter1).Single<User>();
                if(!user1.friends.ContainsKey(fusername))
                    user1.friends.Add(fusername, false);
                else { return ; }
                var user2 = col.Find<User>(filter2).Single<User>();
                if (!user2.friendRequests.Contains(username))
                    user2.friendRequests.Add(username);
                else { return ; }
                col.UpdateOne(filter1, Builders<User>.Update.Set("friends", user1.friends).CurrentDate("lastModified"));
                col.UpdateOne(filter2, Builders<User>.Update.Set("friendRequests", user2.friendRequests).CurrentDate("lastModified"));
            }
            catch(UserNameDoesNotExistException e)
            {
                throw e;
            }
        }
    }
}
