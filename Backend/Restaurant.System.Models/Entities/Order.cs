namespace Restaurant.System.Models;

public class Order
{
    public int Id { get; set;}
    public required string OrderId { get; set; }
    public List<OrderItem> Items { get; set;} = [];
    public required Customer Customer { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public decimal TotalOrderAmount { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}