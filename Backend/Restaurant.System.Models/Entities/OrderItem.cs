namespace Restaurant.System.Models.Entities
{
    public class OrderItem
    {
        public int Id { get; set; } // Primary Key
        public required Order Order { get; set; } // Foreign Key
        public required MenuItem MenuItem { get; set; } //Foreign Key
        public required string OrderNumber { get; set; }
        public required string MenuItemCode { get; set; }
        public int Quantity { get; set; }
        public decimal OrderPrice { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;   
    }
}