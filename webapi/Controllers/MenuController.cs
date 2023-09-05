using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class MenuController : ControllerBase
{
    private static readonly string[] Menu = new[]
    {
        "UserInfo", "Location", "WeatherForecast"
    };

    private readonly ILogger<MenuController> _logger;

    public MenuController(ILogger<MenuController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetMenu")]
    public Menu GetMenu()
    {
        return new Menu
        {
            Title = Menu,
            Role = "Admin",
        };
    }

    public class ResponseModel
    {
        public object Response { get; set; }
        public string Message { get; set; }
    }
}
