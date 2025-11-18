namespace Restaurant.System.Models;

public class Staff
{
    public int Id { get; set;}
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public DateTime DateOfBirth { get; set; }
    public DateTime LoginDateTime { get; set; }
    public DateTime LogoutDateTime { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;

    
    public List<Role> StaffRoles { get; set; } = [];
}