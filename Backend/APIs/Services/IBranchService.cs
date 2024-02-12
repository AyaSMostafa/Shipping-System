using DTOLibrary;

namespace APIs.Services
{
    public interface IBranchService
    {
        int Create(BranchDTO branchDTO);
        int Delete(int id);
        List<BranchDTO> GetAll();
        BranchDTO GetById(int id);
        int Update(BranchDTO branchDTO);
    }
}
