namespace Restaurant.System.Models;

public class Role
{
    public int Id { get; set;}
    public required string RoleCode { get; set; }
    public required string RoleName { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}