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

    [HttpGet("GetInvitee/{phoneNumber}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Invitee))]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetInvitee([FromRoute] string phoneNumber)
    {
        _logger.Debug("Request arrived with the phone number: {phoneNumber}", phoneNumber);
        if (phoneNumber == null) {
            _logger.Error("Recived an empty phone number");
            return BadRequest("Phone number cannot be null.");
        }

        var responseValue = await _inviteeService.GetInvitee(phoneNumber);
        _logger.Debug("Responding with Invitee: {@invitee}", responseValue);
        return Ok(responseValue);
    }

    [HttpPatch("SubmitInvitee")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Invitee))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SubmitInvitee([FromBody] Invitee invitee)
    {
        _logger.Debug("Recived Submition: {@invitee}", invitee);

        if (invitee is null) {
            _logger.Error("Submition is empty.");
            return BadRequest();
        }

        try {
            var submitedData = await _inviteeService.SubmitRsvp(invitee);
            _logger.Information("Request from {InviteeName} submited successfuly", $"{invitee.FirstName} {invitee.LastName}");
            return Ok(submitedData);
        }
        catch (Exception ex) {
            _logger.Error(ex, "Error submiting {InviteeName}", $"{invitee.FirstName} {invitee.LastName}");
            return BadRequest(new { message = ex.Message });
        }
    }


    [HttpPatch("ResetSubmition/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Invitee))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ResetSubmition([FromRoute] string id)
    {
        _logger.Debug("Recived Resut Request from: {inviteeId}", id);

        if (string.IsNullOrEmpty(id)) {
            _logger.Error("Submition is empty.");
            return BadRequest();
        }

        try {
            var invitee = await _inviteeService.ResetSubmition(id);
            _logger.Information("Successfully reset submittion for {FirstName} {LastName}", invitee.FirstName, invitee.LastName);
            return Ok(invitee);
        }
        catch (Exception ex) {
            _logger.Error(ex, "Error resetting {InviteeId}", id);
            return BadRequest(new { message = ex.Message });
        }
    }
}
