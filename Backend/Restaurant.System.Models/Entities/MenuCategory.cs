namespace Restaurant.System.Models;

public class MenuCategory
{
    public int Id { get; set;}
    public required string MenuCategoryCode { get; set; }
    public required string MenuCategoryName { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    
    public List<MenuItem> MenuItemList { get; set; } = [];
}