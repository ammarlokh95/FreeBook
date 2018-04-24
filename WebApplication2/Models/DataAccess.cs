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
    }
}
