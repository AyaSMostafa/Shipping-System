using Microsoft.AspNetCore.Mvc;
using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Authorization;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityService cityService;

        public CityController(ICityService cityService)
        {
            this.cityService = cityService;
        }

        // GET: api/Cities
        [HttpGet]
        [Authorize("CitiesDisplay")]
        public IActionResult GetAll()
        {
            return Ok(cityService.GetAll());
        }

        // GET: api/Cities/5
        [HttpGet("{id:int}", Name = "GetOneCity")]
        [Authorize("CitiesDisplay")]
        public IActionResult GetById(int id)
        {
            var city = cityService.GetById(id);

            if (city == null)
            {
                return NotFound();
            }

            return Ok(city);
        }

        // GET: api/Cities
        [HttpGet("governateId={id:int}")]
        public IActionResult GetByGovernate(int id)
        {
            return Ok(cityService.GetByGovernate(id));
        }

        // PUT: api/Cities/5
        [HttpPut("{id:int}")]
        [Authorize("CitiesUpdate")]
        public IActionResult Update(int id, CityDTO city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                int result = cityService.Update(city);
                if (result > 0)
                {
                    return StatusCode(204, city);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        // POST: api/Cities
        [HttpPost]
        [Authorize("CitiesCreate")]
        public IActionResult Create(CityDTO city)
        {
            if (city == null)
            {
                return BadRequest(ModelState);
            }
            if (ModelState.IsValid)
            {
                int result = cityService.Create(city);
                if (result > 0)
                {
                    city.Id = result;
                    string? url = Url.Link("GetOneCity", new { id = result });
                    return Created(url, city);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/Cities/5
        [HttpDelete("{id}")]
        [Authorize("CitiesDelete")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            int result = cityService.Delete(id);
            if (result > 0)
            {
                return NoContent();
            }
            return StatusCode(500);
        }
    }
}
