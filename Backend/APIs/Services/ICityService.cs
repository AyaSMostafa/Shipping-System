using DTOLibrary;

namespace APIs.Services
{
    public interface ICityService
    {
        int Create(CityDTO city);
        int Delete(int id);
        List<CityDTO> GetAll();
        List<CityDTO> GetByGovernate(int id);
        CityDTO GetById(int id);
        int Update(CityDTO city);
    }
}
