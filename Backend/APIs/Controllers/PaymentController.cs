using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(paymentService.GetAll());
        }
        [HttpGet("{id:int}", Name = "GetOnePayment")]
        public IActionResult GetById(int id)
        {
            return Ok(paymentService.GetById(id));
        }
        [HttpPost]
        public IActionResult Create(PaymentDTO payment)
        {
            if (payment == null)
            {
                return BadRequest(ModelState);
            }
            if (ModelState.IsValid)
            {
                int result = paymentService.Create(payment);
                if (result > 0)
                {
                    payment.Id = result;
                    string? url = Url.Link("GetOnePayment", new { id = result });
                    return Created(url, payment);
                }
            }
            return StatusCode(500);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id , PaymentDTO payment)
        {
            if (id != payment.Id)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                int result = paymentService.Update(payment);
                if (result > 0)
                {
                    return StatusCode(204, payment);
                }
                return StatusCode(500);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            int result = paymentService.Delete(id);
            if( result > 0)
            {
                return Ok();
            }
            return StatusCode(500);
        }
    }
}
