using APIs.Models;
using DTOLibrary;


namespace APIs.Adaptors
{
    public class OrderAdaptor : IOrderAdaptor
    {
        private readonly IProductAdaptor productAdaptor;
        private readonly IClientPhoneAdaptor clientPhoneAdaptor;

        public OrderAdaptor(IProductAdaptor productAdaptor, IClientPhoneAdaptor clientPhoneAdaptor)
        {
            this.productAdaptor = productAdaptor;
            this.clientPhoneAdaptor = clientPhoneAdaptor;
        }
        public Order convertDTOtoOrder(OrderDTO order)
        {
            return new Order()
            {
                ProductsCost = order.ProductsCost,
                ShippingCost = order.ShippingCost,
                OrderDate = order.OrderDate,
                NetWeight = order.NetWeight,
                ClientName = order.ClientName,
                VillageDelivery = order.VillageDelivery,
                Street = order.Street,
                Notes = order.Notes,
                Email = order.Email,
                Branch_Id = order.Branch_Id,
                City_Id = order.City_Id,
                Governate_Id = order.Governate_Id,
                OrderState_Id = order.OrderState_Id,
                OrderType_Id = order.OrderType_Id,
                Payment_Id = order.Payment_Id,
                Shipment_Id = order.Shipment_Id,
                MerchantID = order.MerchantID,
                ClientPhones = clientPhoneAdaptor.convertStringToClientPhone(order.ClientPhones),
                Products = productAdaptor.convertListProducttoDTO(order.Products),
                Id = order.Id,
                WeightSettingsID = order.WeightSettingsID,

            };
        }
        public OrderDTO convertOrdertoDTO(Order order)
        {
            return new OrderDTO()
            {
                ProductsCost = order.ProductsCost,
                ShippingCost = order.ShippingCost,
                OrderDate = order.OrderDate,
                NetWeight = order.NetWeight,
                ClientName = order.ClientName,
                VillageDelivery = order.VillageDelivery,
                Street = order.Street,
                Notes = order.Notes,
                Email = order.Email,
                Branch_Id = order.Branch_Id,
                City_Id = order.City_Id,
                Governate_Id = order.Governate_Id,
                OrderState_Id = order.OrderState_Id,
                OrderType_Id = order.OrderType_Id,
                Payment_Id = order.Payment_Id,
                Shipment_Id = order.Shipment_Id,
                MerchantID = order.MerchantID,
                ClientPhones = clientPhoneAdaptor.convertClientPhoneToString(order.ClientPhones), //here the order must include the client phones
                Products = productAdaptor.convertListProducttoDTO(order.Products),
                Id = order.Id,
                WeightSettingsID = order.WeightSettingsID,
            };
        }
        public List<OrderDTO> convert_List_OrdertoDTO(List<Order> orders)
        {
            List<OrderDTO> DTOlist = new List<OrderDTO>();
            foreach (var order in orders)
            {
                DTOlist.Add(convertOrdertoDTO(order));
            }
            return DTOlist;
        }

        public OrderTableDTO convertOrdertoTableDTO(Order order)
        {
            return new OrderTableDTO()
            {
                Id = order.Id,
                ProductsCost = order.ProductsCost,
                ShippingCost = order.ShippingCost,
                OrderDate = order.OrderDate.Date,
                NetWeight = order.NetWeight,
                ClientName = order.ClientName,
                CityName = order.City.Name,
                GovernrateName = order.Governate.Name,
                MerchantName = order.merchant.FullName,
                OrderStateID = order.OrderState_Id,
                OrderStateName = order.Order_State.Name,
                ClientPhones = clientPhoneAdaptor.convertClientPhoneToString(order.ClientPhones), 
            };
        }

        public List<OrderTableDTO> convert_List_OrdertoTableDTO(List<Order> orders)
        {
            List<OrderTableDTO> DTOlist = new List<OrderTableDTO>();
            foreach (var order in orders)
            {
                DTOlist.Add(convertOrdertoTableDTO(order));
            }
            return DTOlist;
        }


        public List<Order> convert_List_DTOtoOrder(List<OrderDTO> orders)
        {
            List<Order> Orderlist = new List<Order>();
            foreach (var order in orders)
            {
                Orderlist.Add(convertDTOtoOrder(order));
            }
            return Orderlist;
        }
    }
}
