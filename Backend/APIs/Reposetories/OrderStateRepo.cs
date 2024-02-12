using APIs.Models;
using ModelLibrary;


namespace APIs.Reposetories
{
    public class OrderStateRepo : IOrderStateRepo
    {
        Context context;

        public OrderStateRepo(Context context)
        {
            this.context = context;
        }
        public List<Order_State> GetAll()
        {
            return context.Order_States.ToList();
        }
        public Order_State GetById(int id)
        {
            return context.Order_States.SingleOrDefault(s => s.Id == id);
        }
        public int GetByName(string name)
        {
            return context.Order_States.FirstOrDefault(s => s.Name == name).Id;
        }
        public int Create(Order_State OrderState)
        {
            try
            {
                context.Order_States.Add(OrderState);
                context.SaveChanges();
                return OrderState.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public int Update(Order_State OrderState)
        {
            Order_State oldOrderStatet = GetById(OrderState.Id);
            oldOrderStatet.Name = OrderState.Name;

            try
            {
                context.Order_States.Update(oldOrderStatet);
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
                context.Order_States.Remove(GetById(id));
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
