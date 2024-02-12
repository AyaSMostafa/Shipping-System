using ModelLibrary;

namespace APIs.Reposetories
{
    public interface IPaymentRepo
    {
        int Create(Payment payment);
        int Delete(int id);
        List<Payment> GetAll();
        Payment GetById(int id);
        int Update(Payment payment);
    }
}