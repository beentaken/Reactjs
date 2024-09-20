using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly ILogger<ImageController> _logger;

        public ImageController(ILogger<ImageController> logger)
        {
            _logger = logger;
        }

        [HttpPost("PostImagecaption")]
        public async Task<IActionResult> Post([FromBody] SearchRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.SearchText))
            {
                return BadRequest("Invalid request.");
            }

            string filePath = "camera_1/summary.txt";

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found.");
            }

            List<string> matchingLines = new List<string>();

            using (StreamReader reader = new StreamReader(filePath))
            {
                string line;
                while ((line = await reader.ReadLineAsync()) != null)
                {
                    if (line.Contains(request.SearchText))
                    {
                        matchingLines.Add(line);
                    }
                }
            }

            return Ok(matchingLines);
        }

        [HttpGet("PostAnomaly")]
        public async Task<IActionResult> Get()
        {
            string filePath = "camera_1/anomaly.txt";

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found.");
            }

            List<string> matchingLines = new List<string>();

            using (StreamReader reader = new StreamReader(filePath))
            {
                string line;
                while ((line = await reader.ReadLineAsync()) != null)
                {
                    matchingLines.Add(line);
                }
            }

            return Ok(matchingLines);
        }

        public class SearchRequest
        {
            public string SearchText { get; set; }
        }
    }
}
