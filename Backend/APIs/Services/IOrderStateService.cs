using DTOLibrary;

namespace APIs.Services
{
    public interface IOrderStateService
    {
        int Create(OrderStateDTO OrderState);
        int Delete(int id);
        List<OrderStateDTO> GetAll();
        OrderStateDTO GetById(int id);
        int Update(OrderStateDTO OrderState);
    }
}