using ModelLibrary;

namespace APIs.Adaptors
{
    public class ClientPhoneAdaptor : IClientPhoneAdaptor
    {
        public List<ClientPhone> convertStringToClientPhone(List<string> clientPhone)
        {
            List<ClientPhone> clientPhones = new List<ClientPhone>();
            foreach (var phone in clientPhone)
            {
                clientPhones.Add(new ClientPhone()
                {
                    Phone = phone,
                });
            }
            return clientPhones;
        }
        public List<string> convertClientPhoneToString(List<ClientPhone> clientPhone)
        {
            List<string> clientPhones = new List<string>();
            foreach (var phone in clientPhone)
            {
                clientPhones.Add(phone.Phone);
            }
            return clientPhones;
        }
    }
}
