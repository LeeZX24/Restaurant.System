namespace Restaurant.System.Models;

public class MenuItem
{
    public int Id { get; set;}
    public required string MenuItemCode { get; set; }
    public required string MenuItemName { get; set; }
    public required string MenuItemDescription { get; set; }
    public required decimal MenuItemPrice { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}