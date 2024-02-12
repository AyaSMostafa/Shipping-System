using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public interface IGovernateAdaptor
    {
        Governate convertDTOtoGovernate(GovernateDTO governate);
        GovernateDTO convertGovernatetoDTO(Governate governate);
        List<GovernateDTO> convert_List_GovernatetoDTO(List<Governate> governates);
    }
}