using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipmentController : ControllerBase
    {
        private readonly IShipmentService shipmentService;

        public ShipmentController(IShipmentService shipmentService)
        {
            this.shipmentService = shipmentService;
        }

        //api/Shipment
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(shipmentService.GetAll());
        }

        //api/Shipment/2
        [HttpGet("{id:int}", Name = "GetOneShipment")]
        public IActionResult GetById(int id)
        {
            return Ok(shipmentService.GetById(id));
        }

        //api/Shipment
        [HttpPost]
        public IActionResult Create(ShipmentDTO shipment)
        {
            if (shipment == null)
            {
                return BadRequest(ModelState);
            }
            if (ModelState.IsValid)
            {
                int result = shipmentService.Create(shipment);
                if (result > 0)
                {
                    shipment.Id = result;
                    string? url = Url.Link("GetOneShipment", new { id = result });
                    return Created(url, shipment);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        //api/Shipment/2
        [HttpPut("{id:int}")]
        public IActionResult Update(int id, ShipmentDTO shipment)
        {
            if (id != shipment.Id)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                int result = shipmentService.Update(shipment);
                if (result > 0)
                {
                    return StatusCode(204, shipment);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        //api/Shipment/2
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            int result = shipmentService.Delete(id);
            if (result > 0)
            {
                return NoContent();
            }
            return StatusCode(500);
        }
    }
}
