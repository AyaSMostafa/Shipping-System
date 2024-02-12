using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public class ShipmentAdaptor : IShipmentAdaptor
    {
        public List<ShipmentDTO> convert_List_ShipmenttoDTO(List<Shipment> shipments)
        {
            List<ShipmentDTO> shipmentsList = new List<ShipmentDTO>();
            foreach (Shipment shipment in shipments)
            {
                shipmentsList.Add(convertShipmenttoDTO(shipment));
            }
            return shipmentsList;
        }
        public Shipment convertDTOtoShipment(ShipmentDTO shipment)
        {
            return new Shipment()
            {
                Id = shipment.Id,
                Type = shipment.Type,
                ShipmentPrice = shipment.ShipmentPrice,

            };
        }
        public ShipmentDTO convertShipmenttoDTO(Shipment shipment)
        {
            return new ShipmentDTO()
            {
                Id = shipment.Id,
                Type = shipment.Type,
                ShipmentPrice = shipment.ShipmentPrice,
            };
        }
    }
}
