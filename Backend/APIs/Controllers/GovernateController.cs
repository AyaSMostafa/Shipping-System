using APIs.Constants;
using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GovernateController : ControllerBase
    {
        private readonly IGovernateService governateService;

        public GovernateController(IGovernateService governateService)
        {
            this.governateService = governateService;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(governateService.GetAll());
        }

        [HttpGet("{id:int}", Name ="GetOneGovernate")]
        [Authorize("GovernatesDisplay")]
        public IActionResult GetById(int id)
        {
            return Ok(governateService.GetById(id));
        }

        [HttpPost]
        [Authorize("GovernatesCreate")]
        public IActionResult Create(GovernateDTO governate)
        {
            if (governate == null)
            {
                return BadRequest(ModelState);
            }
            if (ModelState.IsValid)
            {
                int result = governateService.Create(governate);
                if (result > 0)
                {
                    governate.Id = result;
                    string? url = Url.Link("GetOneShipment", new { id = result });
                    return Created(url, governate);
                }
            }
            return StatusCode(500);
        }

        [HttpPut("{id:int}")]
        [Authorize("GovernatesUpdate")]
        public IActionResult Update(int id, GovernateDTO governate)
        {
            if (id != governate.Id)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                int result = governateService.Update(governate);
                if (result > 0)
                {
                    return StatusCode(204, governate);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        [Authorize("GovernatesDelete")]
        public IActionResult Delete(int id)
        {
            int result = governateService.Delete(id);
            if (result > 0)
            {
                return Ok();
            }
            return StatusCode(500);
        }

    }
}
