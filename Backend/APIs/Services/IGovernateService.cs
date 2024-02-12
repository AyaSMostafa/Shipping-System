using APIs.Reposetories;
using DTOLibrary;

namespace APIs.Services
{
    public interface IGovernateService
    {
        int Create(GovernateDTO governate);
        int Delete(int id);
        List<GovernateDTO> GetAll();

        GovernateDTO GetById(int id);
        int Update(GovernateDTO governate);
      
    }
}