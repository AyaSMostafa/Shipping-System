using APIs.Models;
using Microsoft.EntityFrameworkCore;
using ModelLibrary;

namespace APIs.Reposetories
{
    public class CityRepo : ICityRepo
    {
        private readonly Context context;

        public CityRepo(Context context)
        {
            this.context = context;
        }
        public int Create(City city)
        {
            try
            {
                context.Cities.Add(city);
                context.SaveChanges();
                return city.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public int Delete(int id)
        {
            City city = GetById(id);
            if (city != null)
            {
                try
                {
                    context.Cities.Remove(city);
                    return context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return -1;
                }
            }
            return -1;
        }

        public List<City> GetAll()
        {
            return context.Cities.Include(c => c.Governate).ToList();
        }

        public List<City> GetByGovernate(int id)
        {
            return context.Cities.Where(c => c.Governate_Id == id).ToList();
        }

        public City GetById(int? id)
        {
            return context.Cities.SingleOrDefault(c => c.Id == id);
        }

        public int Update(City city)
        {
            City oldCity = GetById(city.Id);
            if (oldCity != null)
            {
                try
                {
                    oldCity.Name = city.Name;
                    oldCity.ShippingCost = city.ShippingCost;
                    oldCity.PickupCost = city.PickupCost;
                    oldCity.Governate_Id = city.Governate_Id;
                    return context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return -1;
                }
            }
            return -1;
        }
    }
}
