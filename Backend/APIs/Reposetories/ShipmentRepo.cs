using APIs.Models;
using ModelLibrary;

namespace APIs.Reposetories
{
    public class ShipmentRepo : IShipmentRepo
    {
        Context context;

        public ShipmentRepo(Context context)
        {
            this.context = context;
        }
        public List<Shipment> GetAll()
        {
            return context.Shipments.ToList();
        }
        public Shipment GetById(int id)
        {
            return context.Shipments.SingleOrDefault(s => s.Id == id);
        }
        public int Create(Shipment shipment)
        {
            try
            {
                context.Shipments.Add(shipment);
                context.SaveChanges();
                return shipment.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public int Update(Shipment shipment)
        {
            Shipment oldShipment = GetById(shipment.Id);
            if (oldShipment != null)
            {
                try
                {
                    oldShipment.Type = shipment.Type;
                    return context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return -1;
                }
            }
            return -2;
        }

        public int Delete(int id)
        {
            Shipment shipment = GetById(id);
            if (shipment != null)
            {
                try
                {
                    context.Shipments.Remove(shipment);
                    return context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return -1;
                }
            }
            return -2;
        }
    }
}
