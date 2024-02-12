using APIs.Adaptors;
using APIs.Reposetories;
using DTOLibrary;
using ModelLibrary;

namespace APIs.Services
{
    public class GovernateService : IGovernateService
    {
        private readonly IGovernateRepo governateRepo;
        private readonly IGovernateAdaptor governateAdaptor;

        public GovernateService(IGovernateRepo governateRepo, IGovernateAdaptor governateAdaptor)
        {
            this.governateRepo = governateRepo;
            this.governateAdaptor = governateAdaptor;
        }
        public int Create(GovernateDTO governate)
        {
            return governateRepo.Create(governateAdaptor.convertDTOtoGovernate(governate));
        }

        public int Delete(int id)
        {
            return governateRepo.Delete(id);
        }

        public List<GovernateDTO> GetAll()
        {
            return governateAdaptor.convert_List_GovernatetoDTO(governateRepo.GetAll());
        }

        public GovernateDTO GetById(int id)
        {
            return governateAdaptor.convertGovernatetoDTO(governateRepo.GetById(id));
        }

        public int Update(GovernateDTO governate)
        {
            return governateRepo.Update(governateAdaptor.convertDTOtoGovernate(governate));
        }
        
    }
}

