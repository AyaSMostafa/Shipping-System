using ModelLibrary;

namespace APIs.Reposetories
{
    public interface ICityRepo
    {
        int Create(City city);
        int Delete(int id);
        List<City> GetAll();
        List<City> GetByGovernate(int id);
        City GetById(int? id);
        int Update(City city);
    }
}
