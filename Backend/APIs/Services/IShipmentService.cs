using DTOLibrary;

namespace APIs.Services
{
    public interface IShipmentService
    {
        int Create(ShipmentDTO shipment);
        int Delete(int id);
        List<ShipmentDTO> GetAll();
        ShipmentDTO GetById(int id);
        int Update(ShipmentDTO shipment);
    }
}