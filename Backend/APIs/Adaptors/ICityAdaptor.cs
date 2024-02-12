using DTOLibrary;
using ModelLibrary;

namespace APIs.Adaptors
{
    public interface ICityAdaptor
    {
        CityDTO convertCityToDTO(City city);
        City convertDTOtoCity(CityDTO city);
        List<CityDTO> convert_List_CityToDTO(List<City> cities);
    }
}