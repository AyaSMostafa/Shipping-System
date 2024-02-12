using APIs.Adaptors;
using APIs.Reposetories;                                                                                             
using DTOLibrary;
using ModelLibrary;

namespace APIs.Services
{
    public class PaymentService :IPaymentService
    {
        private readonly IPaymentRepo paymentRepo;
        private readonly IPaymentAdaptor paymentAdaptor;

        public PaymentService(IPaymentRepo paymentRepo, IPaymentAdaptor paymentAdaptor)
        {
            this.paymentRepo = paymentRepo;
            this.paymentAdaptor = paymentAdaptor;
        }
        public int Create(PaymentDTO payment)
        {
            return paymentRepo.Create(paymentAdaptor.convertDTOtoPayment(payment));
        }

        public int Delete(int id)
        {
            return paymentRepo.Delete(id);
        }

        public List<PaymentDTO> GetAll()
        {
            return paymentAdaptor.convert_List_PaymenttoDTO(paymentRepo.GetAll());
        }

        public PaymentDTO GetById(int id)
        {
            return paymentAdaptor.convertPaymenttoDTO(paymentRepo.GetById(id));
        }

        public int Update(PaymentDTO payment)
        {
            return paymentRepo.Update(paymentAdaptor.convertDTOtoPayment(payment));

        }

       
    }
}

