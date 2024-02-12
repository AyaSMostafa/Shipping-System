using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public interface IShipmentAdaptor
    {
        Shipment convertDTOtoShipment(ShipmentDTO shipment);
        ShipmentDTO convertShipmenttoDTO(Shipment shipment);
        List<ShipmentDTO> convert_List_ShipmenttoDTO(List<Shipment> shipments);
    }
}