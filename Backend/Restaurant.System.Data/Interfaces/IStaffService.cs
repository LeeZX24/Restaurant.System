using Restaurant.System.Models.Entities;

namespace Restaurant.System.Data.Interfaces
{
    public interface IStaffService
    {
        Staff GetStaffDetails(string memberId);
        Staff Login();
    }
}