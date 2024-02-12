using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public interface IBranchAdaptor
    {
        List<BranchDTO> convert_List_BranchtoDTO(List<Branch> branches);
        Branch convertDTOtoBranch(BranchDTO dTO);
        BranchDTO convertBranchtoDTO(Branch branch);
    }
}