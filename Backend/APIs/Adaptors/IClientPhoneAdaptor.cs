using ModelLibrary;

namespace APIs.Adaptors
{
    public interface IClientPhoneAdaptor
    {
        List<string> convertClientPhoneToString(List<ClientPhone> clientPhone);
        List<ClientPhone> convertStringToClientPhone(List<string> clientPhone);
    }
}