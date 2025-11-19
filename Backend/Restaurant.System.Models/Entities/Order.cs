using Restaurant.System.Models.Enums;

namespace Restaurant.System.Models.Entities
{
    public class Order
    {
        public int Id { get; set; } // Primary Key
        public required List<OrderItem> Items { get; set; } // Foreign Key
        public required Customer Customer { get; set; } // Foreign Key
        public required Payment Payment { get; set; } // Foreign Key
        public required string OrderNumber { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public decimal TotalOrderAmount { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}