using APIs.Adaptors;
using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService orderService;
        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService;
        }
        //api/Order
        [HttpGet]
        [Authorize("OrdersDisplay")]
        public IActionResult GetAll()
        {
            return Ok(orderService.GetAll());
        }

        //api/Order/Table
        [HttpGet("Table")]
        [Authorize("OrdersDisplay")]
        public IActionResult GetAllTable()
        {
            var userIsMerchant = User.IsInRole("Merchant");
            string id = "";
            if (userIsMerchant)
            {
                string name = User.Identity.Name;
                id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            }
            return Ok(orderService.GetAllTable(id));
        }
        //api/Order/Dependencies
        [HttpGet("Dependencies")]
        public IActionResult GetAllDependencies()
        {
            return Ok(orderService.GetAllDependencies());
        }

        //api/Order/1
        [HttpGet("{id:int}", Name = "GetOneOrder")]
        [Authorize("OrdersDisplay")] 
        public IActionResult GetById(int id)
        {
            return Ok(orderService.GetById(id));
        }

        //api/Order/report
        [HttpPost("report")]
        [Authorize("OrdersDisplay")]
        public IActionResult GetReport(ReportDTO report)
        {
            if (report == null) return BadRequest(ModelState);
            var orders = orderService.GetReports(report);
            return Ok(orders);
        }
        [HttpGet("GetByStatus")]
        [ResponseCache(NoStore = true, Duration = 0)]
        public IActionResult GetByStatus()
        {
            var userIsMerchant = User.IsInRole("Merchant");
            string id = "";
            if (userIsMerchant)
            {
                string name = User.Identity.Name;
                id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            }
            return Ok(orderService.GetByStatus(id));
        }

        //api/Order
        [HttpPost]
        [Authorize("OrdersCreate")]
        public IActionResult Create(OrderDTO order)
        {
            if (order == null) return BadRequest(ModelState);

            if (ModelState.IsValid)
            {
                string name = User.Identity.Name;
                string id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
                order.MerchantID = id;
                OrderDTO result = orderService.Create(order);
                if (result.Id != 0)
                {
                    string? url = Url.Link("GetOneOrder", new { id = result.Id });
                    return Created(url, result);
                }
            }
            return StatusCode(500);
        }

        //api/Order/1
        [HttpPut("{id:int}")]
        [Authorize("OrdersUpdate")]
        public IActionResult Update(int id, OrderDTO order)
        {
            if (id != order.Id) return BadRequest(ModelState);

            if (ModelState.IsValid)
            {
                OrderDTO result = orderService.Update(order);
                if (result.Id != 0)
                {
                    return Ok(result);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        //api/Order/1/Status
        [HttpPut("{id:int}/Status/{stID:int}")]
        [Authorize("OrdersUpdate")]
        public IActionResult UpdateStatus([FromRoute]int id, [FromRoute] int stID)
        {
            if (id == 0 || stID == 0) return BadRequest();

            try
            {
                int result = orderService.UpdateStatus(id, stID);
                if (result > 0)
                {
                    return StatusCode(204);
                }
                return StatusCode(500);
            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }

        //api/Order/1
        [HttpDelete("{id:int}")]
        [Authorize("OrdersDelete")]
        public IActionResult Delete(int id)
        {
            int result = orderService.Delete(id);
            if (result > 0)
            {
                return Ok();
            }
            return StatusCode(500);
        }

    }
}
