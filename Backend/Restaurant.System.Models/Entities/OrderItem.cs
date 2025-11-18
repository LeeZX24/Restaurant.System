namespace Restaurant.System.Models;

public class OrderItem
{
    public int Id { get; set;}
    public required string MenuItemCode { get; set; }
    public int Quantity { get; set; }
    public decimal OrderPrice { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}