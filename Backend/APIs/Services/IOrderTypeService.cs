using DTOLibrary;

namespace APIs.Services
{
    public interface IOrderTypeService
    {
        int Create(OrderTypeDTO OrderType);
        int Delete(int id);
        List<OrderTypeDTO> GetAll();
        OrderTypeDTO GetById(int id);
        int Update(OrderTypeDTO OrderType);
    }
}