namespace Restaurant.System.Models;

public class Member : Customer
{
    public required string MemberId { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public decimal MemberPoint { get; set; } = decimal.Zero;
    public DateTime LoginDateTime { get; set; }
    public DateTime LogoutDateTime { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}
