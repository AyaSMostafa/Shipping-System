using APIs.Adaptors;
using APIs.Reposetories;
using DTOLibrary;
using ModelLibrary;

namespace APIs.Services
{
    public class OrderTypeService : IOrderTypeService
    {
        private readonly IOrderTypeRepo ordertypeRepo;
        private readonly IOrderTypeAdaptor orderTypeAdaptor;

        public OrderTypeService(IOrderTypeRepo ordertypeRepo, IOrderTypeAdaptor orderTypeAdaptor)
        {
            this.ordertypeRepo = ordertypeRepo;
            this.orderTypeAdaptor = orderTypeAdaptor;
        }
        public int Create(OrderTypeDTO orderType)
        {
            return ordertypeRepo.Create(orderTypeAdaptor.convertDTOtoOrderType(orderType));
        }

        public int Delete(int id)
        {
            return ordertypeRepo.Delete(id);
        }

        public List<OrderTypeDTO> GetAll()
        {
            return orderTypeAdaptor.convert_List_OrderTypetoDTO(ordertypeRepo.GetAll());
        }

        public OrderTypeDTO GetById(int id)
        {
            return orderTypeAdaptor.convertOrderTypetoDTO(ordertypeRepo.GetById(id));
        }

        public int Update(OrderTypeDTO orderType)
        {
            return ordertypeRepo.Update(orderTypeAdaptor.convertDTOtoOrderType(orderType));
        }

        

    }
}