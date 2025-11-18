namespace Restaurant.System.Models;

public class Customer
{
    public int Id { get; set; }
    public bool IsMember { get; set; }
    public Member? MemberDetails { get; set; }
}