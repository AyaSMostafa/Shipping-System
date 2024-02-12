using ModelLibrary;

namespace APIs.Reposetories
{
    public interface IGovernateRepo
    {
        int Create(Governate governate);
        int Delete(int id);
        List<Governate> GetAll();
        Governate GetById(int id);
        int Update(Governate governate);
    }
}