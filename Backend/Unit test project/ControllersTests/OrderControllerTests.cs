using APIs.Controllers;
using APIs.Models;
using APIs.Services;
using DTOLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Security.Claims;
using System.Security.Principal;

namespace Unit_test_project.ControllersTests
{
    public class UnitTest1
    {
        [Fact]
        public void GetByStatus_emptyID_listOfEmployeeStatusCount2()
        {
            // Arrange
            string userId = "";
            var mockService = new Mock<IOrderService>();
            mockService.Setup(service => service.GetByStatus(userId))
                .Returns(GetOrdersStatusNumDTOs());
            var user = new ApplicationUser()
            {
                FullName="SuperAdmin",
                UserName = "Merchant@gmail.com",
                Email = "Merchant@gmail.com",
                EmailConfirmed = true
            };
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "SuperAdmin"),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };
            var identity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(identity);

            var httpContext = new DefaultHttpContext()
            {
                User = claimsPrincipal
            };

            var controller = new OrderController(mockService.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext,
                }
            };

            // Act
            var result = controller.GetByStatus() as OkObjectResult;

            // Assert
            var ActionResult = Assert.IsType<OrdersStatusNumDTO>(result.Value);
            var model = Assert.IsAssignableFrom<IEnumerable<StatusNumDTO>>(
                ActionResult.statusNums);
            Assert.Equal(2, model.Count());
        }

        private OrdersStatusNumDTO GetOrdersStatusNumDTOs()
        {
            var result = new OrdersStatusNumDTO();
            result.statusNums.Add(new StatusNumDTO()
            {
                StatusName = "«·ﬂ·",
                OrdersNumbers = 12,
                Percentage = 100
            });
            result.statusNums.Add(new StatusNumDTO()
            {
                StatusName = "ÃœÌœ",
                OrdersNumbers = 6,
                Percentage = 50
            });
            return result;
        }


    }
}