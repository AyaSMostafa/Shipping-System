using ModelLibrary;

namespace APIs.Reposetories
{
    public interface IOrderStateRepo
    {
        int Create(Order_State OrderState);
        int Delete(int id);
        List<Order_State> GetAll();
        Order_State GetById(int id);
        int Update(Order_State OrderState);
        int GetByName(string name);
    }
}