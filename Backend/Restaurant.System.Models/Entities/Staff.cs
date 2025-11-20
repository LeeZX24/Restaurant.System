namespace Restaurant.System.Models.Entities
{
    public class Staff
    {
        public int Id { get; set; } // Primary Key
        public required List<Role> StaffRoles { get; set; } // Foreign Key
        public List<Order> OrderHistory { get; set; } = new List<Order>(); // Foreign Key
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime LoginDateTime { get; set; }
        public DateTime LogoutDateTime { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}