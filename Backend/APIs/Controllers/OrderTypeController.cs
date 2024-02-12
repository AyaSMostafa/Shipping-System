using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderTypeController : ControllerBase
    {
        private readonly IOrderTypeService OrderTypeService;

        public OrderTypeController(IOrderTypeService OrderTypeService)
        {
            this.OrderTypeService = OrderTypeService;
        }

        //api/OrderType
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(OrderTypeService.GetAll());
        }

        //api/OrderType/2
        [HttpGet("{id:int}", Name = "GetOneOrderType")]
        public IActionResult GetById(int id)
        {
            return Ok(OrderTypeService.GetById(id));
        }

        //api/OrderType
        [HttpPost]
        public IActionResult Create(OrderTypeDTO ordertype)
        {
            if (ordertype == null)
            {
                return BadRequest(ModelState);
            }
            if (ModelState.IsValid)
            {
                int result = OrderTypeService.Create(ordertype);
                if (result > 0)
                {
                    ordertype.Id = result;
                    string? url = Url.Link("GetOneOrderState", new { id = result });
                    return Created(url, ordertype);
                }
            }
            return StatusCode(500);
        }

        //api/OrderType/2
        [HttpPut("{id:int}")]
        public IActionResult Update(int id, OrderTypeDTO ordertype)
        {
            if (id != ordertype.Id)
            {
                return BadRequest();
            }
            int result = OrderTypeService.Update(ordertype);
            if (result > 0)
            {
                return StatusCode(204, ordertype);
            }
            return StatusCode(500);
        }

        //api/OrderState/2
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            int result = OrderTypeService.Delete(id);
            if (result > 0)
            {
                return Ok();
            }
            return StatusCode(500);
        }
    }
}
