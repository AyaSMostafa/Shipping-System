using APIs.Adaptors;
using APIs.Reposetories;
using DTOLibrary;
using ModelLibrary;

namespace APIs.Services
{
    public class OrderStateService : IOrderStateService
    {
        private readonly IOrderStateRepo orderStateRepo;
        private readonly IOrderStateAdaptor orderStateAdaptor;

        public OrderStateService(IOrderStateRepo orderStateRepo, IOrderStateAdaptor orderStateAdaptor)
        {
            this.orderStateRepo = orderStateRepo;
            this.orderStateAdaptor = orderStateAdaptor;
        }
        public int Create(OrderStateDTO OrderState)
        {
            return orderStateRepo.Create(orderStateAdaptor.convertDTOtoOrderState(OrderState));
        }

        public int Delete(int id)
        {
            return orderStateRepo.Delete(id);
        }

        public List<OrderStateDTO> GetAll()
        {
            return orderStateAdaptor.convert_List_OrderStatetoDTO(orderStateRepo.GetAll());
        }

        public OrderStateDTO GetById(int id)
        {
            return orderStateAdaptor.convertOrderStatetoDTO(orderStateRepo.GetById(id));
        }

        public int Update(OrderStateDTO orderState)
        {
            return orderStateRepo.Update(orderStateAdaptor.convertDTOtoOrderState(orderState));
        }

        
    }
}
