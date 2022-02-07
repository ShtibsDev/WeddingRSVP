using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeddingArrival.Models;
using System.Text.Json;

namespace WeddingArrival.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InviteesController : ControllerBase
    {
        Invitee _invitee = new() {
            FirstName = "ג\'וטרו",
            LastName = "קוג\'ו",
            Lang = "he",
            IsMale = true,
            PhoneNumber = "0500000000"
        };

        [HttpGet]
        [Route("GetInvitee/{phoneNumber}")]
        public async Task<IActionResult> GetInvitee([FromRoute] string phoneNumber)
        {
            if (phoneNumber == null) {
                return BadRequest("Phone number cannot be null.");
            }

            return Ok(await Task.Run(() => _invitee));
        }

        [HttpPost]
        [Route("SubmitInvitee")]
        public async Task<IActionResult> SubmitInvitee([FromBody] Invitee invitee)
        {
            if (invitee == null) {
                return BadRequest();
            }

            string value = JsonSerializer.Serialize(invitee);
            await Task.Run(() => Console.WriteLine(value));

            return Ok();
        }
    }
}
