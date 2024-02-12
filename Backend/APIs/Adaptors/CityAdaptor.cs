using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public class CityAdaptor : ICityAdaptor
    {
        public List<CityDTO> convert_List_CityToDTO(List<City> cities)
        {
            List<CityDTO> citieslist = new List<CityDTO>();
            foreach (City city in cities)
            {
                citieslist.Add(convertCityToDTO(city));
            }
            return citieslist;
        }

        public CityDTO convertCityToDTO(City city)
        {
            return new CityDTO()
            {
                Id = city.Id,
                Name = city.Name,
                ShippingCost = city.ShippingCost,
                PickupCost = city.PickupCost,
                Governate_Id = city.Governate_Id,
                Governate_Name= city.Governate != null ? city.Governate.Name : null,
            };
        }

        public City convertDTOtoCity(CityDTO city)
        {
            return new City()
            {
                Id = city.Id,
                Name = city.Name,
                ShippingCost = city.ShippingCost,
                PickupCost = city.PickupCost,
                Governate_Id = city.Governate_Id,
                
            };
        }
    }
}
