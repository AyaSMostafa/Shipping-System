using DTOLibrary;

namespace APIs.Services
{
    public interface IOrderService
    {
        OrderDTO Create(OrderDTO order);
        int Delete(int id);
        List<OrderDTO> GetAll();
        List<OrderTableDTO> GetAllTable(string id);
        OrderDTO GetById(int id);
        List<OrderTableDTO> GetReports(ReportDTO report);
        OrdersStatusNumDTO GetByStatus(string id);
        OrderDTO Update(OrderDTO order);
        int UpdateStatus(int orderId, int statusId);
        OrderDependenciesDTO GetAllDependencies();
    }
}