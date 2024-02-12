using APIs.Models;
using ModelLibrary;


namespace APIs.Reposetories
{
    public class OrderTypeRepo : IOrderTypeRepo
    {
        Context context;

        public OrderTypeRepo(Context context)
        {
            this.context = context;
        }
        public List<Order_Type> GetAll()
        {
            return context.Order_Types.ToList();
        }
        public Order_Type GetById(int id)
        {
            return context.Order_Types.SingleOrDefault(s => s.Id == id);
        }
        public int Create(Order_Type OrderType)
        {
            try
            {
                context.Order_Types.Add(OrderType);
                context.SaveChanges();
                return OrderType.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public int Update(Order_Type OrderType)
        {
            Order_Type oldOrderType = GetById(OrderType.Id);
            oldOrderType.Name = OrderType.Name;

            try
            {
                context.Order_Types.Update(oldOrderType);
                return context.SaveChanges();
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
                context.Order_Types.Remove(GetById(id));
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
