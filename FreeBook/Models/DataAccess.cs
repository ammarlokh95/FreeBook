using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using FreeBook.AppExceptions;
using FreeBook.Helper;
using Microsoft.Extensions.Options;

namespace FreeBook.Models
{
    public interface IDataAccess
    {
        Task<IEnumerable<Status>> GetAllStatus();

        Task<IEnumerable<Status>> GetAllStatusSince(DateTime date);

        Task PostStatus(Status s);

        Task RegisterNewUser(User ui);

        Task<User> LoginUser(string username, string password);
        
        Task<User> GetUserByUsername(string username);
        
        Task<IEnumerable<Status>> GetAllStatusOfUser(string username);
        Task<bool> AddFriend(string username, string fusername);
    }
    public class DataAccess : IDataAccess
    {
        MongoClient _client;
        IMongoDatabase _db;

        public DataAccess(IOptions<Settings> settings)
        {
            _client = new MongoClient(settings.Value.ConnectionString);
            if (_client != null)
                _db = _client.GetDatabase(settings.Value.Database);
        }

        public async Task<IEnumerable<Status>> GetAllStatus()
        {
            try
            {
                return await _db.GetCollection<Status>("Status").Find(_ => true).Sort("{ postDate: -1 }").ToListAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
        }
        public async Task<IEnumerable<Status>> GetAllStatusSince(DateTime date)
        {
            try
            {
                var filter = Builders<Status>.Filter.Gt("postDate", date);
                var sort = Builders<Status>.Sort.Descending("postDate");
                var options = new FindOptions<Status>
                {
                    Sort = sort
                };
                var list =  await _db.GetCollection<Status>("Status").FindAsync(filter, options);
                return await list.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
        }
        public async Task PostStatus(Status s)
        {
            try
            {
                var col = _db.GetCollection<Status>("Status");
                await col.InsertOneAsync(s);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
        }
        /* public Status GetStatus(ObjectId id)
         {
             return _db.GetCollection<Product>("Products").Find
         }
         */
        public async Task RegisterNewUser(User ui)
        {
            Debugger da = new Debugger();
            da.Log(ui.ToJson());
            var col = _db.GetCollection<User>("User");
            var filter = Builders<User>.Filter.Eq("username", ui.username);
            try
            {
                if (col.Find<User>(filter).Count() == 0)
                {
                    await col.InsertOneAsync(ui);
                }
                else throw (new UserNameExistsException("Username Exists!"));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
        }

        public async Task<User> LoginUser(string username, string password)
        {
            var builder = Builders<User>.Filter;
            var filters = builder.Eq("username", username) & builder.Eq("password", password);
            var col = _db.GetCollection<User>("User");
            try
            {
                if (col.Find<User>(filters).Count() == 1) {
                    var user = await col.FindAsync<User>(filters);
                    return user.First<User>();
                }
                else throw (new UserNameDoesNotExistException("Username or Password does not match"));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
        }
        public async Task<User> GetUserByUsername(string username)
        {
            var builder = Builders<User>.Filter;
            var filters = builder.Eq("username", username);
            var col = _db.GetCollection<User>("User");
            try
            {
                if (col.Find<User>(filters).Count() == 1)
                {
                    var user = await col.FindAsync<User>(filters);
                    return user.First<User>();
                }
                else throw (new UserNameDoesNotExistException("Username not found"));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
        }
        public async Task<IEnumerable<Status>> GetAllStatusOfUser(string username)
        {
            var builder = Builders<Status>.Filter;
            var filters = builder.Eq("username", username);
            var col = _db.GetCollection<Status>("Status");
            var sort = Builders<Status>.Sort.Descending("postDate");
            var options = new FindOptions<Status>
            {
                Sort = sort
            };

            try
            {
                if (col.Find<Status>(filters).Count() > 0)
                {
                    var list = await col.FindAsync<Status>(filters, options);
                    return await list.ToListAsync();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
        }

        public async Task<bool> AddFriend(string username, string fusername)
        {
            var builder = Builders<User>.Filter;
            var filter1 = builder.Eq("username", username);
            var filter2 = builder.Eq("username", fusername);
            var col = _db.GetCollection<User>("User");
            try
            {
                var user1 = col.Find<User>(filter1).Single<User>();
                
                    if (!user1.friends.ContainsKey(fusername))
                        user1.friends.Add(fusername, false);
                    else { return false; }
                    var user2 = col.Find<User>(filter2).Single<User>();
                    if (!user2.friendRequests.Contains(username))
                        user2.friendRequests.Add(username);
                    else { return false; }
                try
                {
                    var result1 = await col.UpdateOneAsync(filter1, Builders<User>.Update.Set("friends", user1.friends).CurrentDate("lastModified"));
                    var result2 = await col.UpdateOneAsync(filter2, Builders<User>.Update.Set("friendRequests", user2.friendRequests).CurrentDate("lastModified"));
                    return result1.IsAcknowledged && (result1.ModifiedCount > 0) && result2.IsAcknowledged && result2.ModifiedCount > 0;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    throw ex;

                }
            }
            catch(UserNameDoesNotExistException e)
            {
                throw e;
            }
        }
    }
}
