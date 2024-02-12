using APIs.Adaptors;
using APIs.Reposetories;
using DTOLibrary;
using ModelLibrary;

namespace APIs.Services
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepo shipmentRepo;
        private readonly IShipmentAdaptor shipmentAdaptor;

        public ShipmentService(IShipmentRepo shipmentRepo, IShipmentAdaptor shipmentAdaptor)
        {
            this.shipmentRepo = shipmentRepo;
            this.shipmentAdaptor = shipmentAdaptor;
        }

        public int Create(ShipmentDTO shipment)
        {
            return shipmentRepo.Create(shipmentAdaptor.convertDTOtoShipment(shipment));
        }

        public int Delete(int id)
        {
            return shipmentRepo.Delete(id);
        }

        public List<ShipmentDTO> GetAll()
        {
            return shipmentAdaptor.convert_List_ShipmenttoDTO(shipmentRepo.GetAll());
        }

        public ShipmentDTO GetById(int id)
        {
            return shipmentAdaptor.convertShipmenttoDTO(shipmentRepo.GetById(id));
        }

        public int Update(ShipmentDTO shipment)
        {
            return shipmentRepo.Update(shipmentAdaptor.convertDTOtoShipment(shipment));
        }
    }
}
