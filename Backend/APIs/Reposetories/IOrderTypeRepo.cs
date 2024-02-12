using ModelLibrary;

namespace APIs.Reposetories
{
    public interface IOrderTypeRepo
    {
        int Create(Order_Type OrderType);
        int Delete(int id);
        List<Order_Type> GetAll();
        Order_Type GetById(int id);
        int Update(Order_Type OrderType);
    }
}