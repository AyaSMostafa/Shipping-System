using APIs.Models;
using ModelLibrary;

namespace APIs.Reposetories
{
    public class PaymentRepo :IPaymentRepo
    {
        Context context;
        public PaymentRepo(Context context)
        {
            this.context = context;
        }

        public int Create(Payment payment)
        {
            try
            {
                context.Payments.Add(payment);
                context.SaveChanges();
                return payment.Id;
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
                context.Payments.Remove(GetById(id));
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public List<Payment> GetAll()
        {
            return context.Payments.ToList();
        }

        public Payment GetById(int id)
        {
            return context.Payments.SingleOrDefault(p => p.Id == id);
        }

        public int Update(Payment payment)
        {
            Payment oldPayment = GetById(payment.Id);

            try
            {
                oldPayment.Name = payment.Name;
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
