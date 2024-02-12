using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public class GovernateAdaptor : IGovernateAdaptor
    {
        public List<GovernateDTO> convert_List_GovernatetoDTO(List<Governate> governates)
        {
            List<GovernateDTO> governatesList = new List<GovernateDTO>();
            foreach (Governate governate in governates)
            {
                governatesList.Add(convertGovernatetoDTO(governate));
            }
            return governatesList;
        }
        public Governate convertDTOtoGovernate(GovernateDTO governate)
        {
            return new Governate()
            {
                Id = governate.Id,
                Name = governate.Name,
                Status = governate.Status
            };
        }
        public GovernateDTO convertGovernatetoDTO(Governate governate)
        {
            return new GovernateDTO()
            {
                Id = governate.Id,
                Name = governate.Name,
                Status = governate.Status
            };
        }
    }
}
