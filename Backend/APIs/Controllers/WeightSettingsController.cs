
using Microsoft.AspNetCore.Mvc;
using APIs.Models;
using ModelLibrary;
using APIs.Reposetories;
using Microsoft.AspNetCore.Authorization;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "SuperAdmin")]
    public class WeightSettingsController : ControllerBase
    {
        private readonly IWeightSettingsRepo Iweight;
        public WeightSettingsController(Context context, IWeightSettingsRepo Iweight)
        {
            this.Iweight = Iweight;
        }

        [HttpPost]
        public IActionResult Create(WeightSettings weight)
        {
            if (weight == null)
            {
                return BadRequest(ModelState);
            }


            if (ModelState.IsValid)
            {
                int result = Iweight.Create(weight);
                if (result > 0)
                {
                    weight.Id = result;
                    string? url = Url.Link("GetOneWeight", new { id = weight.Id });
                    return Created(url, weight);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(Iweight.GetAll());
        }

        //api/WeightSettingsController/1
        [HttpGet("{id:int}", Name = "GetOneWeight")]
        public IActionResult GetById(int id)
        {
            var weight = Iweight.GetById(id);
            return Ok(weight);
        }
        //api/WeightSettingsController/Last/1
        [HttpGet("Last/{id:int}", Name = "GetLastWeight")]
        public IActionResult GetLast()
        {
            var weight = Iweight.GetLast();
            return Ok(weight);
        }
    }
}
