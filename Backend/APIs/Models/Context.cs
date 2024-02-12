using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ModelLibrary;

namespace APIs.Models
{
    public class Context : IdentityDbContext<ApplicationUser>
    {
        public Context()
        {
        }
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClientPhone>().HasKey(p => new { p.OrderId, p.Phone });
            modelBuilder.Entity<Product>().HasKey(p => new { p.OrderId, p.Name });
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<ClientPhone> ClientPhones { get; set; }
        public DbSet<Governate> Governates { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Order_State> Order_States { get; set; }
        public DbSet<Order_Type> Order_Types { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<WeightSettings> Weights { get; set; }



    }
}
