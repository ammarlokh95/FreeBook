using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using FreeBook.Models;
using FreeBook.AppExceptions;
using FreeBook.Validation;
using Microsoft.AspNetCore.Http;
using FreeBook.Helper;
using System.Net.Http;
using System.Net;
using System.Web;
using System.IO;

namespace FreeBook.Controllers
{
    //[Produces("application/json")]
    //[Route("api/user")]
    public class UserController : Controller
    {
        private readonly IDataAccess _da;
        public UserController(IDataAccess dataAccess)
        {
            _da = dataAccess;
        }

        [HttpGet("Login/")]
        public IActionResult LoginPage()
        {
            return View("Login");
        }

        [HttpPost("api/user/register/")]
        public async Task<HttpResponseMessage> RegisterAsync([FromBody]JObject jObject)
        {
            var info = JsonConvert.DeserializeObject<Dictionary<string, string>>(jObject.ToString());
            var response = new HttpResponseMessage();
            var userInfo = new User();
            var debug = new Debugger();

            if (!Validator.RegistrationValidator(info["firstname"], info["lastname"], info["username"], info["password"]))
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.ReasonPhrase = "Username or Password format is invalid";
                return response;
            }
            userInfo.firstname = info["firstname"];
            userInfo.lastname = info["lastname"];
            userInfo.username = info["username"];
            userInfo.password = info["password"];
            userInfo.joinDate = DateTime.Now;
            try
            {
                await _da.RegisterNewUser(userInfo);
                response.StatusCode = HttpStatusCode.OK;
                return response;
            }
            catch (UserNameExistsException e)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.ReasonPhrase = e.Message;
                return response;
            }

        }
        private class LoginReply
        {
            public string username { get; set; }
            public string firstname { get; set; }
            public string lastname { get; set; }
            public string token { get; set; }
            public LoginReply(User u)
            {
                username = u.username;
                firstname = u.firstname;
                lastname = u.lastname;
                token = generateToken();
            }
            private string generateToken()
            {
                string chars = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&";
                int nums = chars.Length - 1;
                string token = "";
                Random rand = new Random(this.username.Length + this.firstname.Length + this.lastname.Length);
                for(int i = 0; i<16; i++)
                {
                    int k = rand.Next(nums);
                    token += chars[nums];
                }
                return token;
            }
        }
        [HttpPost("api/user/login")]
        public async Task<HttpResponseMessage> LoginUserAsync([FromBody]JObject jObject)
        {
            var info = JsonConvert.DeserializeObject<Dictionary<string, string>>(jObject.ToString());
            var userInfo = new User();
            var debug = new Debugger();
            var response = new HttpResponseMessage();
            if (!Validator.LoginValidator(info["username"], info["password"]))
            {
                response.StatusCode = HttpStatusCode.BadRequest;                
                debug.Log(jObject.ToString());
                response.ReasonPhrase = "Username or Password format is invalid";
                return response;
            }

            try
            {
                userInfo = await _da.LoginUser(info["username"], info["password"]);
            }
            catch (UserNameDoesNotExistException e)
            {
                response.ReasonPhrase = e.Message;
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            var loginReply = new LoginReply(userInfo);
            response.Content = new StringContent(JsonConvert.SerializeObject(loginReply));
            return response;
        }
        [HttpPost("api/user/addFriend")]
        public async Task<HttpResponseMessage> AddAsFriendAsync([FromQuery] string username, [FromQuery] string friend_username)
        {
            var response = new HttpResponseMessage();
            var debug = new Debugger();

            if (!Validator.UsernameValidator(username) || !Validator.UsernameValidator(friend_username))
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.ReasonPhrase = "Username's are not valid";
                return response;
            }
            try
            {
                await _da.AddFriend(username, friend_username);
                response.StatusCode = HttpStatusCode.OK;
                return response;
            }
            catch (UserNameDoesNotExistException e)
            {
                response.ReasonPhrase = e.Message;
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }
        }
        private class UserAndStatus
        {
            public User user { get; set; }
            public IEnumerable<Status> statuses { get; set; }
            public UserAndStatus(User u, IEnumerable<Status> s)
            {
                user = u;
                statuses = s;
            }
        }
        [HttpGet("api/user/{username}")]
        public async Task<HttpResponseMessage> PersonalPageAsync([FromQuery] string username)
        {
            
            var response = new HttpResponseMessage();
            var userInfo = new User();
            var debug = new Debugger();

            if (!Validator.UsernameValidator(username))
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.ReasonPhrase = "Bad username format";
                return response;
            }

            try
            {
                userInfo = await _da.GetUserByUsername(username);
            }
            catch (UserNameDoesNotExistException e)
            {
                response.ReasonPhrase = e.Message;
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }
            var statuses = await _da.GetAllStatusOfUser(username);
            response.StatusCode = HttpStatusCode.OK;
            var output = new UserAndStatus(userInfo, statuses);
            response.Content = new StringContent(JsonConvert.SerializeObject(output));
            return response;
        }
        [HttpGet("api/userAndFriend")]
        public async Task<HttpResponseMessage> UserPageAsync([FromQuery] string logged_username, [FromQuery] string page_username)
        {

            var response = new HttpResponseMessage();
            var userInfo = new User();
            var debug = new Debugger();
            if (!Validator.UsernameValidator(logged_username) || !Validator.UsernameValidator(page_username))
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.ReasonPhrase = "Bad username format";
                return response;
            }

            try
            {
                userInfo = await _da.GetUserByUsername(page_username);
            }
            catch (UserNameDoesNotExistException e)
            {
                response.ReasonPhrase = e.Message;
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }

            var statuses = await _da.GetAllStatusOfUser(page_username);
            response.StatusCode = HttpStatusCode.OK;
            var output = new UserAndStatus(userInfo, statuses);
            response.Content = new StringContent(JsonConvert.SerializeObject(output));
            return response;
        }

    }
    
}
