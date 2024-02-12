using ModelLibrary;

namespace APIs.Reposetories
{
    public interface IBranchRepo
    {
        int Create(Branch branch);
        int Delete(int id);
        List<Branch> GetAll();
        Branch GetById(int id);
        int Update(Branch branch);
    }
}
