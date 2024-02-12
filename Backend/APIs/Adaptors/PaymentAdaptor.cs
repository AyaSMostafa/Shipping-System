using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public class PaymentAdaptor : IPaymentAdaptor
    {
        public List<PaymentDTO> convert_List_PaymenttoDTO(List<Payment> payments)
        {
            List<PaymentDTO> paymentsList = new List<PaymentDTO>();
            foreach (Payment payment in payments)
            {
                paymentsList.Add(convertPaymenttoDTO(payment));
            }
            return paymentsList;
        }
        public Payment convertDTOtoPayment(PaymentDTO payment)
        {
            return new Payment()
            {
                Id = payment.Id,
                Name = payment.Name
            };
        }
        public PaymentDTO convertPaymenttoDTO(Payment payment)
        {
            return new PaymentDTO()
            {
                Id = payment.Id,
                Name = payment.Name
            };
        }
    }
}
