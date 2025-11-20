using Restaurant.System.Models;
using Restaurant.System.Models.Entities;

namespace Restaurant.System.Data.Interfaces
{
    public interface ICustomerService
    {
        Task<bool> IsCustomerAnonymous(string CustomerId);

        Task<Customer> GetCurrentCustomer(string CustomerId);

        Task<Member> GetMemberAsync(string email);
    }
}