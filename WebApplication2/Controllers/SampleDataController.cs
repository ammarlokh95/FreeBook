using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebApplication2.Models;
using WebApplication2.AppExceptions;
using WebApplication2.Validation;
using Microsoft.AspNetCore.Http;
using WebApplication2.Helper;
using System.Net.Http;
using System.Net;
using System.Web;
namespace WebApplication1.Controllers
{
    public class UserController : Controller
    {

        [HttpPost("api/user/register")]
        public HttpResponseMessage Register([FromBody]JObject jObject)
        {
            var info = JsonConvert.DeserializeObject<Dictionary<string, string>>(jObject.ToString());
            var response = new HttpResponseMessage();
            var userInfo = new User();
            var debug = new Debugger();
            var da = new DataAccess();

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
                da.RegisterNewUser(userInfo);
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
        class LoginReply
        {
            public string username { get; set; }
            public string firstname { get; set; }
            public string lastname { get; set; }
            public LoginReply(User u)
            {
                username = u.username;
                firstname = u.firstname;
                lastname = u.lastname;
            }
        }
        [HttpPost("api/login/user")]
        public HttpResponseMessage LoginUser([FromBody]JObject jObject)
        {
            var info = JsonConvert.DeserializeObject<Dictionary<string, string>>(jObject.ToString());
            var response = new HttpResponseMessage();
            var userInfo = new User();
            var debug = new Debugger();
            var da = new DataAccess();

            if (!Validator.LoginValidator(info["username"], info["password"]))
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                debug.Log(jObject.ToString());
                response.ReasonPhrase = "Username or Password format is invalid";
                return response;
            }
            
            try
            {
                userInfo = da.LoginUser(info["username"], info["password"]);
            }
            catch (UserNameDoesNotExistException e)
            {
                response.ReasonPhrase = e.Message;
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            var loginReply = new LoginReply(userInfo);
            response.ReasonPhrase = JsonConvert.SerializeObject(loginReply);
            return response;
        }
        class UserAndStatus
        {
            public User user { get; set; }
            public IEnumerable<Status> statuses { get; set; }
            public UserAndStatus(User u, IEnumerable<Status> s)
            {
                user = u;
                statuses = s;
            }
        }
        [HttpGet("api/user/")]
        public HttpResponseMessage UserPage([FromQuery] string username)
        {
            
            var response = new HttpResponseMessage();
            var userInfo = new User();
            var debug = new Debugger();
            var da = new DataAccess();

            if (!Validator.UsernameValidator(username))
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.ReasonPhrase = "Bad username format";
                return response;
            }

            try
            {
                userInfo = da.GetUserByUsername(username);
            }
            catch (UserNameDoesNotExistException e)
            {
                response.ReasonPhrase = e.Message;
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }
            var statuses = da.GetAllStatusOfUser(username);
            response.StatusCode = HttpStatusCode.OK;
            var output = new UserAndStatus(userInfo, statuses);
            response.ReasonPhrase = JsonConvert.SerializeObject(output);
            return response;
        }

    }

    public class StatusController : Controller
    {
        DataAccess da;
        Debugger debug;
        public StatusController()
        {
            
        }
        [HttpGet("action")]
        [Route("api/status/getallstatus")]
        public string GetAllStatus()
        {
            da = new DataAccess();
            var status = new Status();
            debug = new Debugger();

            var statuses = da.GetAllStatus();
            var jsonResult = JsonConvert.SerializeObject(statuses);
           // debug.Log(jsonResult);
            return jsonResult;
        }

        [HttpPost("action")]
        [Route("api/status/poststatus")]
        public HttpResponseMessage PostStatus([FromBody] JObject jObject)
        {
            da = new DataAccess();
            debug = new Debugger();
            var status = new Status();
            var data = JsonConvert.DeserializeObject<Dictionary<string, string>>(jObject.ToString());
            //debug.Log(jObject.ToString());
            status.username = data["username"];
            status.message = data["message"];
            status.postDate = DateTime.Now;
            da.PostStatus(status);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
