using Microsoft.AspNetCore.Mvc;

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
    public IEnumerable<Location> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new Location
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Country = Country[Random.Shared.Next(Country.Length)],
            Continent = Continent[Random.Shared.Next(Continent.Length)],
        })
        .ToArray();
    }
}
