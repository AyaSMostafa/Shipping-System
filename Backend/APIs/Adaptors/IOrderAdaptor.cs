using APIs.Models;
using DTOLibrary;

namespace APIs.Adaptors
{
    public interface IOrderAdaptor
    {
        Order convertDTOtoOrder(OrderDTO order);
        OrderDTO convertOrdertoDTO(Order order);
        OrderTableDTO convertOrdertoTableDTO(Order order);
        List<OrderDTO> convert_List_OrdertoDTO(List<Order> orders);
        List<Order> convert_List_DTOtoOrder(List<OrderDTO> orders);
        List<OrderTableDTO> convert_List_OrdertoTableDTO(List<Order> orders);
    }
}