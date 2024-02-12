using APIs.Adaptors;
using APIs.Reposetories;
using DTOLibrary;
using ModelLibrary;

namespace APIs.Services
{
    public class CityService : ICityService
    {
        private readonly ICityRepo cityRepo;
        private readonly ICityAdaptor cityAdaptor;

        public CityService(ICityRepo cityRepo, ICityAdaptor cityAdaptor)
        {
            this.cityRepo = cityRepo;
            this.cityAdaptor = cityAdaptor;
        }
        public int Create(CityDTO city)
        {
            return cityRepo.Create(cityAdaptor.convertDTOtoCity(city));
        }

        public int Delete(int id)
        {
            return cityRepo.Delete(id);
        }

        public List<CityDTO> GetAll()
        {
            return cityAdaptor.convert_List_CityToDTO(cityRepo.GetAll());
        }

        public List<CityDTO> GetByGovernate(int id)
        {
            return cityAdaptor.convert_List_CityToDTO(cityRepo.GetByGovernate(id));
        }

        public CityDTO GetById(int id)
        {
            return cityAdaptor.convertCityToDTO(cityRepo.GetById(id));
        }

        public int Update(CityDTO city)
        {
            return cityRepo.Update(cityAdaptor.convertDTOtoCity(city));
        }

        
    }
}
