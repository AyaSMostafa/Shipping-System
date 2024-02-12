using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public class OrderStateAdaptor : IOrderStateAdaptor
    {
        public List<OrderStateDTO> convert_List_OrderStatetoDTO(List<Order_State> OrderStates)
        {
            List<OrderStateDTO> OrderstatesList = new List<OrderStateDTO>();
            foreach (Order_State orderState in OrderStates)
            {
                OrderstatesList.Add(convertOrderStatetoDTO(orderState));
            }
            return OrderstatesList;
        }
        public Order_State convertDTOtoOrderState(OrderStateDTO orderState)
        {
            return new Order_State()
            {
                Id = orderState.Id,
                Name = orderState.Name,
            };
        }
        public OrderStateDTO convertOrderStatetoDTO(Order_State orderState)
        {
            return new OrderStateDTO()
            {
                Id = orderState.Id,
                Name = orderState.Name,
            };
        }
    }
}
