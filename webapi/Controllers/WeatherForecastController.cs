using Microsoft.AspNetCore.Mvc;
using webapi.Model;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        // Use POST to accept data from the client
        [HttpPost("PostExcel")]
        public IActionResult PostExcel([FromBody] Staff excelData) // Expecting a list of dictionaries
        {
            //if (excelData == null || excelData.Count == 0)
            //{
            //    return BadRequest("No data received.");
            //}

            // Process data (for example, log it, save to DB, etc.)
            _logger.LogInformation("Received Excel data: {@excelData}", excelData);

            // Return the received data as a response
            return Ok(new { ReceivedData = excelData });
        }
    }
}
