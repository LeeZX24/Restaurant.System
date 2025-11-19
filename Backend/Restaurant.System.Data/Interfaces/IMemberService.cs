using Restaurant.System.Models;
using Restaurant.System.Models.Entities;

namespace Restaurant.System.Data.Interfaces
{
    public interface IMemberService
    {
        Task<List<Member>> GetMemberList();
        Task<Member> GetMemberDetail(string memberId);
        Task<Member> Login(string userName, string password);
    }
}