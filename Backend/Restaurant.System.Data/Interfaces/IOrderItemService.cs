using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Restaurant.System.Models.Entities;

namespace Restaurant.System.Data.Interfaces
{
    public interface IOrderItemService
    {
        Task<List<OrderItem>> GetOrderItemsFromOrder(string OrderId);
        Task<MenuItem> GetMenuItemDetailsFromOrderItem(string OrderItemCode);
    }
}