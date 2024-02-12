using APIs.Adaptors;
using APIs.Models;
using APIs.Reposetories;
using DTOLibrary;
using ModelLibrary;

namespace APIs.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepo orderRepo;
        private readonly IOrderAdaptor orderAdaptor;
        private readonly ICityRepo cityRepo;
        public readonly IShipmentRepo shipmentRepo;
        public readonly IWeightSettingsRepo weightSettingsRepo;
        private readonly IOrderStateRepo orderStateRepo;
        private readonly IBranchService branchService;
        private readonly ICityService cityService;
        private readonly IGovernateService governateService;
        private readonly IPaymentService paymentService;
        private readonly IShipmentService shipmentService;
        private readonly IOrderTypeService orderTypeService;

        public OrderService(IOrderRepo orderRepo, IShipmentRepo shipmentRepo,
            IOrderAdaptor orderAdaptor, ICityRepo cityRepo,
            IWeightSettingsRepo weightSettingsRepo, IOrderStateRepo orderStateRepo, IBranchService branchService, ICityService cityService, IGovernateService governateService, IPaymentService paymentService, IShipmentService shipmentService, IOrderTypeService orderTypeService)
        {
            this.orderRepo = orderRepo;
            this.orderAdaptor = orderAdaptor;
            this.cityRepo = cityRepo;
            this.weightSettingsRepo = weightSettingsRepo;
            this.orderStateRepo = orderStateRepo;
            this.branchService = branchService;
            this.cityService = cityService;
            this.governateService = governateService;
            this.paymentService = paymentService;
            this.shipmentService = shipmentService;
            this.orderTypeService = orderTypeService;
            this.shipmentRepo = shipmentRepo;
        }

        public OrderDTO Create(OrderDTO orderDto)
        {
            var CalculatedOrder = OrderCalculations(orderDto);
            int statusID = orderStateRepo.GetByName("جديد");
            CalculatedOrder.OrderState_Id = statusID;
            var order = orderAdaptor.convertDTOtoOrder(CalculatedOrder);

            if (orderRepo.Create(order) > 0) CalculatedOrder.Id = order.Id;

            return CalculatedOrder;
        }
        public OrderDTO Update(OrderDTO orderDto)
        {
            var CalculatedOrder = OrderCalculations(orderDto);
            var order = orderAdaptor.convertDTOtoOrder(CalculatedOrder);
            if (orderRepo.Update(order) > 0) CalculatedOrder.Id = order.Id;

            return CalculatedOrder;
        }

        private OrderDTO OrderCalculations(OrderDTO CalculatedOrder)
        {
            

            var GetCity = cityRepo.GetById(CalculatedOrder.City_Id);
            var GetCityCost = GetCity.ShippingCost;

            decimal TotalCost = 0;
            TotalCost += GetCityCost;

            if (CalculatedOrder.VillageDelivery)
            {
                TotalCost += 5;
            }

            var GetShipment = shipmentRepo.GetById(CalculatedOrder.Shipment_Id);
            var GetShipmentCost = GetShipment.ShipmentPrice;
            TotalCost += GetShipmentCost;

            decimal ProductWeightResult = 0;
            foreach (var p in CalculatedOrder.Products)
            {

                ProductWeightResult += (p.Weight * p.Quantity);
            }
            CalculatedOrder.NetWeight = ProductWeightResult;


            var weight = weightSettingsRepo.GetLast();
            CalculatedOrder.WeightSettingsID = weight.Id;

            decimal WeightDifference = 0;
            TotalCost += weight.DefaultPrice;
            if (ProductWeightResult > weight.DefaultWeight)
            {
                WeightDifference = ProductWeightResult - weight.DefaultWeight;
                TotalCost += (WeightDifference * weight.AdditionalPrice);

            }


            CalculatedOrder.NetWeight = ProductWeightResult;
            CalculatedOrder.ShippingCost = TotalCost;
            return CalculatedOrder;
        }

        public int Delete(int id)
        {
            return orderRepo.Delete(id);
        }

        public List<OrderDTO> GetAll()
        {
            return orderAdaptor.convert_List_OrdertoDTO(orderRepo.GetAll());
        }
        public List<OrderTableDTO> GetReports(ReportDTO report)
        {
            return orderAdaptor.convert_List_OrdertoTableDTO(orderRepo.GetByStateAndDates(report.OrderState_Id, report.StartDate, report.EndDate));
        }
        public List<OrderTableDTO> GetAllTable(string id)
        {
            List<Order> orders = new List<Order>();
            if (id.Equals(""))
            {
                orders = orderRepo.GetAllTable();
            }
            else
            {
                orders = orderRepo.GetByMerchant(id);
            }
            return orderAdaptor.convert_List_OrdertoTableDTO(orders);
        }
        public OrderDependenciesDTO GetAllDependencies()
        {
            OrderDependenciesDTO result = new OrderDependenciesDTO();
            result.Branches = branchService.GetAll();
            result.Cities = cityService.GetAll();
            result.Governates = governateService.GetAll();
            result.Shipments = shipmentService.GetAll();
            result.Payments = paymentService.GetAll();
            result.OrderTypes = orderTypeService.GetAll();
            return result;
        }
        
        public OrderDTO GetById(int id)
        {
            return orderAdaptor.convertOrdertoDTO(orderRepo.GetById(id));
        }

        public OrdersStatusNumDTO GetByStatus(string id)
        {
            List<Order> orders = new List<Order>();
            if (id.Equals(""))
            {
                orders = orderRepo.GetAll();
            }
            else
            {
                orders = orderRepo.GetByMerchant(id);
            }
            var states = orderStateRepo.GetAll();
            OrdersStatusNumDTO ordersStatus = new OrdersStatusNumDTO();
            ordersStatus.statusNums.Add(new StatusNumDTO()
            {
                StatusName = "الكل",
                OrdersNumbers = orders.Count(),
                Percentage = 100
            });
            foreach(var state in states)
            {
                StatusNumDTO statusNumDTO = new StatusNumDTO();
                statusNumDTO.StatusName = state.Name;
                statusNumDTO.OrdersNumbers = orders.Where(o => o.OrderState_Id == state.Id).Count();
                if(ordersStatus.statusNums[0].OrdersNumbers > 0)
                {
                statusNumDTO.Percentage = (int)(((decimal)statusNumDTO.OrdersNumbers / (decimal)ordersStatus.statusNums[0].OrdersNumbers) * 100);
                }
                ordersStatus.statusNums.Add(statusNumDTO);
            }
            return ordersStatus;
        }
        

        public int UpdateStatus(int orderId, int statusId)
        {
            return orderRepo.UpdateStatus(orderId,statusId);
        }


    }
}

