using APIs.Models;
using Microsoft.EntityFrameworkCore;
using ModelLibrary;
namespace APIs.Reposetories
{
    public class OrderRepo : IOrderRepo
    {
        private Context context;

        public OrderRepo(Context context)
        {
            this.context = context;
        }

        public int Create(Order order)
        {
            try
            {
                context.Orders.Add(order);
                context.SaveChanges();
                return order.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public int Delete(int id)
        {
            try
            {
                context.Remove(GetById(id));
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public List<Order> GetAll()
        {
            return context.Orders.Include(o => o.ClientPhones).Include(o => o.Products).ToList();
        }
        public List<Order> GetAllTable()
        {
            return context.Orders.Include(o => o.ClientPhones).Include(o => o.Governate).Include(o => o.City).Include(o => o.merchant).Include(o => o.Order_State).ToList();
        }

        public List<Order> GetByMerchant(string id)
        {
            return context.Orders.Where(o => o.MerchantID.Equals(id)).Include(o => o.ClientPhones).Include(o => o.Governate).Include(o => o.City).Include(o => o.merchant).Include(o => o.Order_State).ToList();
        }
        public Order GetById(int id)
        {
            return context.Orders.Include(o => o.ClientPhones).Include(o => o.Products).SingleOrDefault(o => o.Id == id);
        }
        public List<Order> GetByStateAndDates(int stateID, DateTime dateTimeStart, DateTime dateTimeEnd)
        {
            return context.Orders.Where(o => o.OrderState_Id == stateID && dateTimeStart <= o.OrderDate && o.OrderDate <= dateTimeEnd).Include(o => o.ClientPhones).Include(o => o.Governate).Include(o => o.City).Include(o => o.merchant).Include(o => o.Order_State).ToList();
            //  return context.Orders.Where(o => o.OrderState_Id == stateID).BetweenDates(dateTimeStart, dateTimeEnd).ToList();
        }
        public int Update(Order order)
        {
            Order oldOrder = GetById(order.Id);

            try
            {
                oldOrder.ProductsCost = order.ProductsCost;
                oldOrder.ShippingCost = order.ShippingCost;
                oldOrder.OrderDate = order.OrderDate;
                oldOrder.NetWeight = order.NetWeight;
                oldOrder.ClientName = order.ClientName;
                oldOrder.VillageDelivery = order.VillageDelivery;
                oldOrder.Street = order.Street;
                oldOrder.Notes = order.Notes;
                oldOrder.Email = order.Email;
                oldOrder.Branch_Id = order.Branch_Id;
                oldOrder.City_Id = order.City_Id;
                oldOrder.Governate_Id = order.Governate_Id;
                oldOrder.OrderState_Id = order.OrderState_Id;
                oldOrder.OrderType_Id = order.OrderType_Id;
                oldOrder.Payment_Id = order.Payment_Id;
                oldOrder.Shipment_Id = order.Shipment_Id;
                oldOrder.MerchantID = order.MerchantID;
                oldOrder.ClientPhones = order.ClientPhones;
                oldOrder.Products = order.Products;
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
        public int UpdateStatus(int orderId, int statusId)
        {
            Order oldOrder = GetById(orderId);

            try
            {
                oldOrder.OrderState_Id = statusId;
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }





    }
}
