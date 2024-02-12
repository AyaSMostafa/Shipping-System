using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public class BranchAdaptor : IBranchAdaptor
    {
        public List<BranchDTO> convert_List_BranchtoDTO(List<Branch> branches)
        {
            List<BranchDTO> branchesList = new List<BranchDTO>();
            foreach (Branch branch in branches)
            {
                branchesList.Add(convertBranchtoDTO(branch));
            }
            return branchesList;
        }
        public Branch convertDTOtoBranch(BranchDTO dTO)
        {
            return new Branch()
            {
                Id = dTO.Id,
                Name = dTO.Name,
                Status = dTO.Status,
                CreationDate = dTO.CreationDate,
            };
        }
        public BranchDTO convertBranchtoDTO(Branch branch)
        {
            return new BranchDTO()
            {
                Id = branch.Id,
                Name = branch.Name,
                Status = branch.Status,
                CreationDate = branch.CreationDate,
            };
        }
    }
}
