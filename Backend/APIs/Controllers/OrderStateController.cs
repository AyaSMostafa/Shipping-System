using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStateController : ControllerBase
    {
        private readonly IOrderStateService OrderStateService;

        public OrderStateController(IOrderStateService OrderStateService)
        {
            this.OrderStateService = OrderStateService;
        }

        //api/OrderState
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(OrderStateService.GetAll());
        }

        //api/OrderState/2
        [HttpGet("{id:int}", Name = "GetOneOrderState")]
        public IActionResult GetById(int id)
        {
            return Ok(OrderStateService.GetById(id));
        }

        //api/OrderState
        [HttpPost]
        public IActionResult Create(OrderStateDTO orderstate)
        {
            if (orderstate == null)
            {
                return BadRequest(ModelState);
            }
            if (ModelState.IsValid)
            {
                int result = OrderStateService.Create(orderstate);
                if (result > 0)
                {
                    orderstate.Id = result;
                    string? url = Url.Link("GetOneOrderState", new { id = result });
                    return Created(url, orderstate);
                }
            }
            return StatusCode(500);
        }

        //api/OrderState/2
        [HttpPut("{id:int}")]
        public IActionResult Update(int id, OrderStateDTO orderstate)
        {
            if (id != orderstate.Id)
            {
                return BadRequest();
            }
            int result = OrderStateService.Update(orderstate);
            if (result > 0)
            {
                return StatusCode(204, orderstate);
            }
            return StatusCode(500);
        }

        //api/OrderState/2
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            int result = OrderStateService.Delete(id);
            if (result > 0)
            {
                return Ok();
            }
            return StatusCode(500);
        }
    }
}
