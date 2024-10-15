using Microsoft.AspNetCore.Mvc;
using webapi.Model;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class LocationController : ControllerBase
{
    private static readonly string[] Country = new[]
    {
        "France", "Brazil", "Chile", "China", "Malaysia", "Wales", "Belgium", "Haiti", "Singapore", "Sudan"
    };

    private static readonly string[] Continent = new[]
    {
        "Africa", "Antarctica", "Asia", "Australia", "Oceania", "Europe", "North America", "South America"
    };

    private readonly ILogger<LocationController> _logger;

    public LocationController(ILogger<LocationController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetLocation")]
    public IEnumerable<Location> GetLocation()
    {
        return Enumerable.Range(1, 5).Select(index => new Location
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Country = Country[Random.Shared.Next(Country.Length)],
            Continent = Continent[Random.Shared.Next(Continent.Length)],
        })
        .ToArray();
    }
    [HttpPost("robot/test")]
    public IActionResult Post([FromBody] RequestModel model)
    {
        // Process the model received from the request
        // ...

        // Create the response object
        var response = new ResponseModel
        {
            Response = model,
            Message = "Post request successful"
        };

        // Return the response as JSON
        return Ok(response);
    }

    [HttpPost("robot/test2/{id}")]
    public IActionResult Get(int id)
    {
        // Create the response object
        var response = new ResponseModel
        {
            Response = id,
            Message = "Get request successful"
        };

        // Return the response as JSON
        return Ok(response);
    }
    public class RequestModel
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }

    public class ResponseModel
    {
        public object Response { get; set; }
        public string Message { get; set; }
    }
}
