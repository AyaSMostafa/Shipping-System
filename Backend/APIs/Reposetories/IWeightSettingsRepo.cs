using ModelLibrary;
namespace APIs.Reposetories
{
    public interface IWeightSettingsRepo
    {
        int Create(WeightSettings weight);
        List<WeightSettings> GetAll();
        WeightSettings GetById(int id);
        WeightSettings GetLast();
    }
}
