using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public interface IOrderStateAdaptor
    {
        Order_State convertDTOtoOrderState(OrderStateDTO orderState);
        OrderStateDTO convertOrderStatetoDTO(Order_State orderState);
        List<OrderStateDTO> convert_List_OrderStatetoDTO(List<Order_State> OrderStates);
    }
}