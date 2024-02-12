using DTOLibrary;

namespace APIs.Services
{
    public interface IPaymentService
    {
        int Create(PaymentDTO payment);
        int Delete(int id);
        List<PaymentDTO> GetAll();
        PaymentDTO GetById(int id);
        int Update (PaymentDTO payment);
    }
}