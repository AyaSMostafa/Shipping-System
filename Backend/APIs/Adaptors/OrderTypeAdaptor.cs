using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public class OrderTypeAdaptor : IOrderTypeAdaptor
    {
        public List<OrderTypeDTO> convert_List_OrderTypetoDTO(List<Order_Type> OrderTypes)
        {
            List<OrderTypeDTO> OrdertypesList = new List<OrderTypeDTO>();
            foreach (Order_Type orderType in OrderTypes)
            {
                OrdertypesList.Add(convertOrderTypetoDTO(orderType));
            }
            return OrdertypesList;
        }
        public Order_Type convertDTOtoOrderType(OrderTypeDTO orderType)
        {
            return new Order_Type()
            {
                Id = orderType.Id,
                Name = orderType.Name,
            };
        }
        public OrderTypeDTO convertOrderTypetoDTO(Order_Type orderType)
        {
            return new OrderTypeDTO()
            {
                Id = orderType.Id,
                Name = orderType.Name,
            };
        }
    }
}
