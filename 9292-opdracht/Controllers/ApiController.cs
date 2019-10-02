using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _9292_opdracht.Models;
using RestSharp;


namespace _9292_opdracht.Controllers
{
    public class ApiController
    {
        public ApiResponse DoRequest(string city)
        {
            // Create a new RestClient and RestRequest
            var client = new RestClient("https://community-open-weather-map.p.rapidapi.com/weather?units=metric&mode=xml%2C%20html&q=" + city);
            var request = new RestRequest(Method.GET);

            // Set headers for the request
            request.AddHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
            request.AddHeader("x-rapidapi-key", "e8ce882815mshf54cb22c36551aap16ad9cjsnffb545ca83e1");

            // Execute the request and put the response in the 'response' variable. After that, parse the response into a usable object.
            IRestResponse response = client.Execute<ApiResponse>(request);
            ApiResponse resp = Newtonsoft.Json.JsonConvert.DeserializeObject<ApiResponse>(response.Content);

            return resp;
        }
    }
}
