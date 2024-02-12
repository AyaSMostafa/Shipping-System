using APIs.Models;
using ModelLibrary;

namespace APIs.Reposetories
{
    public class GovernateRepo : IGovernateRepo
    {
        Context context;
        public GovernateRepo(Context context)
        {
            this.context = context;
        }
        public int Create(Governate governate)
        {
            try
            {
                context.Governates.Add(governate);
                context.SaveChanges();
                return governate.Id;
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
                context.Governates.Remove(GetById(id));
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public List<Governate> GetAll()
        {
            return context.Governates.ToList();
        }

        public Governate GetById(int id)
        {
            return context.Governates.SingleOrDefault(g => g.Id == id);

        }

        public int Update(Governate governate)
        {
           Governate oldGovernate = GetById(governate.Id);

            try
            {
                oldGovernate.Name = governate.Name;
                oldGovernate.Status=governate.Status;
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
