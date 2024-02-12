using APIs.Models;

namespace APIs.Reposetories
{
    public interface IOrderRepo
    {
        List<Order> GetAll();
        List<Order> GetAllTable();
        int Create(Order order);
        int Delete(int id);
        Order GetById(int id);
        List<Order> GetByMerchant(string id);
        List<Order> GetByStateAndDates(int stateID, DateTime dateTimeStart, DateTime dateTimeEnd);
        int Update(Order order);
        int UpdateStatus(int orderId, int statusId);

    }
}