using Microsoft.AspNetCore.Mvc;
using WeddingRSVP.Server.Data.Services;
using WeddingRSVP.Server.Exceptions;

namespace WeddingRSVP.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InviteesController : ControllerBase
{
    private readonly IInviteeService _inviteeService;
    private readonly Serilog.ILogger _logger;

    public InviteesController(IInviteeService inviteeService, Serilog.ILogger logger)
    {
        _inviteeService = inviteeService;
        _logger = logger;
    }

    [HttpGet]
    [Route("GetInvitee/{phoneNumber}")]
    public async Task<IActionResult> GetInvitee([FromRoute] string phoneNumber)
    {
        _logger.Information("Request arrived with the phone number: {phoneNumber}", phoneNumber);
        if (phoneNumber == null) {
            _logger.Error("Recived an empty phone number");
            return BadRequest("Phone number cannot be null.");
        }

        var responseValue = await _inviteeService.GetInvitee(phoneNumber);
        _logger.Debug("Responding with Invitee: {@invitee}", responseValue);
        return Ok(responseValue);
    }

    [HttpPut]
    [Route("SubmitInvitee")]
    public async Task<IActionResult> SubmitInvitee([FromBody] Invitee invitee)
    {
        _logger.Debug("Recived Submition: {@invitee}", invitee);

        if (invitee == null) {
            _logger.Error("Submition is empty.");
            return BadRequest();
        }

        try {
            await _inviteeService.SubmitRsvp(invitee);
            _logger.Information("Request from {InviteeName} submited successfuly", $"{invitee.FirstName} {invitee.LastName}");
            return Ok();
        }
        catch (PreviouslySubmitedException) {
            return BadRequest(new { status = "PreviouslySubmitedException" });
        }
    }
}
