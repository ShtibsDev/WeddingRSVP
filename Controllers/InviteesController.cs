using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeddingArrival.Models;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using WeddingArrival.Data.Services;

namespace WeddingArrival.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InviteesController : ControllerBase
    {
        private readonly IInviteeService _inviteeService;
        private ILogger<InviteesController> _logger;

        public InviteesController(IInviteeService inviteeService, ILogger<InviteesController> logger)
        {
            _inviteeService = inviteeService;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetInvitee/{phoneNumber}")]
        public async Task<IActionResult> GetInvitee([FromRoute] string phoneNumber)
        {
            _logger.LogInformation("Request arrived with the phone number: {phoneNumber}", phoneNumber);
            if (phoneNumber == null) {
                _logger.LogError("Recived an empty phone number");
                return BadRequest("Phone number cannot be null.");
            }

            var responseValue = await _inviteeService.GetInvitee(phoneNumber);
            _logger.LogDebug("Responding with Invitee: {@invitee}", responseValue);
            return Ok(responseValue);
        }

        [HttpPost]
        [Route("SubmitInvitee")]
        public async Task<IActionResult> SubmitInvitee([FromBody] Invitee invitee)
        {
            _logger.LogDebug("Recived Submition: {@invitee}", invitee);


            if (invitee == null) {
                _logger.LogError("Submition is empty.");
                return BadRequest();
            }

            string value = JsonSerializer.Serialize(invitee);
            await Task.Run(() => Console.WriteLine(value));

            _logger.LogInformation("Request submited successfuly");
            return Ok();
        }
    }
}
