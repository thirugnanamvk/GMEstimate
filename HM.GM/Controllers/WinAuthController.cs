using Microsoft.AspNetCore.Mvc;
namespace HM.GM.Controllers
{
    [Route("api/[controller]")]
    public class WinAuthController : Controller
    {
        [HttpGet]
        [Route("getuser")]
        public IActionResult GetUser()
        {
            if (User.Identity.IsAuthenticated)
            {
                return Ok(User.Identity.Name);
            }
            else
            {
                return BadRequest("Not authenticated");
            }
        }
    }
}