using Microsoft.EntityFrameworkCore;
using Restaurant.System.Data.Interfaces;
using Restaurant.System.Models.Entities;

namespace Restaurant.System.Data.Repositories
{
    public class MemberService : IMemberService
    {
        private readonly IRepository<Member> _memberRepository;

        public MemberService(IRepository<Member> memberRepository)
        {
            _memberRepository = memberRepository;
        }

        public async Task<Member> GetMemberDetail(string memberId)
        {
            var member = (await _memberRepository.GetByFieldAsync(e => e.MemberId == memberId)).FirstOrDefault();
            
            return member ?? throw new ArgumentNullException(nameof(member));
        }

        public async Task<List<Member>> GetMemberList()
        {
            return await _memberRepository.GetAllAsync();
        }

        public Task<Member> Login(string userName, string password)
        {
            throw new NotImplementedException();
        }
    }
}

