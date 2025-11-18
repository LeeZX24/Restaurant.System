namespace Restaurant.System.Models;

public class Menu
{
    public int Id { get; set;}
    public required string MenuCode { get; set; }
    public required string MenuName { get; set; }
    public MenuDays MenuDays { get; set; } = MenuDays.AllDays;
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    
    public List<MenuCategory> MenuCategoryList { get; set; } = [];
}