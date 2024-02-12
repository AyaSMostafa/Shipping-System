using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public interface IPaymentAdaptor
    {
        Payment convertDTOtoPayment(PaymentDTO payment);
        PaymentDTO convertPaymenttoDTO(Payment payment);
        List<PaymentDTO> convert_List_PaymenttoDTO(List<Payment> payments);
    }
}