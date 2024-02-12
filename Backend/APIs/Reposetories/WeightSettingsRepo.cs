using APIs.Models;
using ModelLibrary;

namespace APIs.Reposetories
{
    public class WeightSettingsRepo : IWeightSettingsRepo
    {
        private readonly Context context;
        public WeightSettingsRepo(Context context)
        {
            this.context = context;
        }
        public int Create(WeightSettings weight)
        {
            try
            {
                context.Weights.Add(weight);
                context.SaveChanges();
                return weight.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
        public List<WeightSettings> GetAll()
        {
            return context.Weights.ToList();
        }
        public WeightSettings GetById(int id)
        {
            return context.Weights.SingleOrDefault(w => w.Id == id);
        }
        public WeightSettings GetLast()
        {
            var latestId = context.Weights.Max(MaxW => MaxW.Id);
            return context.Weights.Find(latestId);

            // return context.Weights.LastOrDefault();
        }
    }
}
