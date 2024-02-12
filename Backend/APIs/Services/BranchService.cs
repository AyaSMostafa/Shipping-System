using APIs.Adaptors;
using APIs.Reposetories;
using DTOLibrary;
using ModelLibrary;

namespace APIs.Services
{
    public class BranchService : IBranchService
    {
        private readonly IBranchRepo branchRepo;
        private readonly IBranchAdaptor branchAdaptor;

        public BranchService(IBranchRepo branchRepo, IBranchAdaptor branchAdaptor)
        {
            this.branchRepo = branchRepo;
            this.branchAdaptor = branchAdaptor;
        }

        public int Create(BranchDTO branchDTO)
        {
            return branchRepo.Create(branchAdaptor.convertDTOtoBranch(branchDTO));
        }

        public int Delete(int id)
        {
            return branchRepo.Delete(id);
        }

        public List<BranchDTO> GetAll()
        {
            return branchAdaptor.convert_List_BranchtoDTO(branchRepo.GetAll());
        }

        public BranchDTO GetById(int id)
        {
            return branchAdaptor.convertBranchtoDTO(branchRepo.GetById(id));
        }

        public int Update(BranchDTO branchDTO)
        {
            return branchRepo.Update(branchAdaptor.convertDTOtoBranch(branchDTO));
        }
        
    }
}
