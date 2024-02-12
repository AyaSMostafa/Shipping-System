using ModelLibrary;

namespace APIs.Reposetories
{
    public interface IShipmentRepo
    {
        int Create(Shipment shipment);
        int Delete(int id);
        List<Shipment> GetAll();
        Shipment GetById(int id);
        int Update(Shipment shipment);
    }
}