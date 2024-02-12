using APIs.Models;
using ModelLibrary;

namespace APIs.Reposetories
{
    public class BranchRepo : IBranchRepo
    {
        Context context;
        public BranchRepo(Context context)
        {
            this.context = context;
        }

        public int Create(Branch branch)
        {
            try
            {
                context.Branches.Add(branch);
                context.SaveChanges();
                return branch.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        public int Delete(int id)
        {
            try
            {
                context.Branches.Remove(GetById(id));
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public List<Branch> GetAll()
        {
            return context.Branches.ToList();
        }

        public Branch GetById(int id)
        {
            return context.Branches.SingleOrDefault(s => s.Id == id);
        }

        public int Update(Branch branch)
        {
            Branch oldbranch = GetById(branch.Id);

            try
            {
                oldbranch.Name = branch.Name;
                oldbranch.Status = branch.Status;
                oldbranch.CreationDate = branch.CreationDate;
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
