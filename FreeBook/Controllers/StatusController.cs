using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FreeBook.Helper;
using FreeBook.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FreeBook.Controllers
{
    //[Produces("application/json")]
    //[Route("api/status")]
    public class StatusController : Controller
    {
        Debugger debug;
        private readonly IDataAccess _da;

        public StatusController(IDataAccess dataAccess)
        {
            _da = dataAccess;
        }
        //[HttpGet("action")]
        //[Route("api/status/getallstatus")]
        //public string GetAllStatus()
        //{
        //    da = new DataAccess();
        //    var status = new Status();
        //    debug = new Debugger();

        //    var statuses = da.GetAllStatus();
        //    var jsonResult = JsonConvert.SerializeObject(statuses);
        //   // debug.Log(jsonResult);
        //    return jsonResult;
        //}

        [HttpGet("action")]
        [Route("api/status/getallstatus")]
        public async Task<string> GetAllStatusAsync([FromQuery] long last_fetch)
        {
            var status = new Status();
            debug = new Debugger();
            DateTime date = new DateTime(1970, 1, 1);
            date = date.AddMilliseconds(last_fetch);
            debug.Log(date.ToString());
            try
            {
                var statuses = await _da.GetAllStatusSince(date);
                var jsonResult = JsonConvert.SerializeObject(statuses);
                debug.Log(jsonResult);
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }        
        }

        [HttpPost("action")]
        [Route("api/status/poststatus")]
        public async Task<HttpResponseMessage> PostStatusAsync([FromBody] JObject jObject)
        {
            debug = new Debugger();
            var status = new Status();
            var data = JsonConvert.DeserializeObject<Dictionary<string, string>>(jObject.ToString());
            //debug.Log(jObject.ToString());
            status.username = data["username"];
            status.message = data["message"];
            status.postDate = DateTime.Now;
            debug.Log(status.postDate.ToString());
            try
            {
                await _da.PostStatus(status);
            }
            catch(Exception Ex)
            {
                throw Ex;
            }
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}