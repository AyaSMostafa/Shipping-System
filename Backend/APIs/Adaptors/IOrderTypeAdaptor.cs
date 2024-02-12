using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public interface IOrderTypeAdaptor
    {
        Order_Type convertDTOtoOrderType(OrderTypeDTO orderType);
        OrderTypeDTO convertOrderTypetoDTO(Order_Type orderType);
        List<OrderTypeDTO> convert_List_OrderTypetoDTO(List<Order_Type> OrderTypes);
    }
}