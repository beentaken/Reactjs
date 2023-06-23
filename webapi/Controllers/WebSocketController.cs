using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class WebSocketController : Controller
{
    private WebSocket _webSocket;

    [HttpGet]
    [Route("/ws")]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            _webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            await ReceiveLoop();
        }
        else
        {
            HttpContext.Response.StatusCode = 400;
        }
    }

    private async Task ReceiveLoop()
    {
        var buffer = new byte[1024];
        while (_webSocket.State == WebSocketState.Open)
        {
            var result = await _webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            if (result.MessageType == WebSocketMessageType.Text)
            {
                var receivedMessage = Encoding.UTF8.GetString(buffer, 0, result.Count);
                // Process received message
                await _webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    {
        _webSocket?.Dispose();
    }
}
