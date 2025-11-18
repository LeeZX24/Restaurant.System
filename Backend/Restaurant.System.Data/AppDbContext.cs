
using Microsoft.EntityFrameworkCore;
using Restaurant.System.Models;

namespace Restaurant.System.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            
        }

        //User
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Member> Members => Set<Member>();
        public DbSet<Staff> Staffs => Set<Staff>();
        public DbSet<Role> Roles => Set<Role>();

        // Menu
        public DbSet<Menu> Menus => Set<Menu>();
        public DbSet<MenuCategory> MenuCategories => Set<MenuCategory>();
        public DbSet<MenuItem> MenuItems => Set<MenuItem>();

        //Order
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        
        //Payment
        public DbSet<Payment> Payments => Set<Payment>();
    }
}
