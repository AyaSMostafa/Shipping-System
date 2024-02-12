
using Microsoft.AspNetCore.Mvc;
using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Authorization;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly IBranchService branchService;

        public BranchController(IBranchService branchService)
        {
            this.branchService = branchService;
        }

        //api/Branch
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(branchService.GetAll());
        }

        //api/Branch/2
        [HttpGet("{id:int}", Name = "GetOneBranch")]
        [Authorize("BranchesDisplay")]
        public IActionResult GetById(int id)
        {
            return Ok(branchService.GetById(id));
        }

        //api/Branch
        [HttpPost]

        [Authorize("BranchesCreate")]
        public IActionResult Create(BranchDTO branchDTO)
        {
            if (branchDTO == null)
            {
                return BadRequest(ModelState);
            }
            if (ModelState.IsValid)
            {
                int result = branchService.Create(branchDTO);
                if (result > 0)
                {
                    branchDTO.Id = result;
                    string? url = Url.Link("GetOneBranch", new { id = result });
                    return Created(url, branchDTO);
                }
            }
            return StatusCode(500);
        }

        //api/Branch/2
        [HttpPut("{id:int}")]
        [Authorize("BranchesUpdate")]
        public IActionResult Update(int id, BranchDTO branchDTO)
        {
            if (id != branchDTO.Id)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                int result = branchService.Update(branchDTO);
                if (result > 0)
                {
                    return StatusCode(204, branchDTO);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        //api/Branch/2
        [HttpDelete ("{id}")]
        [Authorize("BranchesDelete")]
        public IActionResult Delete(int id)
        {
            int result = branchService.Delete(id);
            if (result > 0)
            {
                return Ok();
            }
            return StatusCode(500);
        }
    }
}
