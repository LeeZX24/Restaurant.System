using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Restaurant.System.Data;
using Restaurant.System.Data.Interfaces;
using Restaurant.System.Models.Dtos;
using Restaurant.System.Models.Entities;
using Restaurant.System.Services.Interfaces;

namespace Restaurant.System.Services.Services
{
    public class AuthService : IAuthService
    {
        private readonly ICustomerService _customerService;
        private readonly IStaffService _staffService;
        private readonly IConfiguration _configuration;
        private readonly IRepository<Member> _memberRepository;

        public AuthService(
            ICustomerService CustomerService,
            IStaffService StaffService,
            IConfiguration Configuration,
            IRepository<Member> MemberRepository)
        {
            _customerService = CustomerService;
            _staffService = StaffService;
            _configuration = Configuration;
            _memberRepository = MemberRepository;
        }
        public async Task<string?> LoginByEmailAsync(UserDto user)
        {
            //Get Member
            var member = await _customerService.GetMemberAsync(user.Email!);
            if (member == null) return null;

            //Check Password
            var passwordValid = BCrypt.Net.BCrypt.Verify(user.PasswordHash, member.Password);
            if (!passwordValid) return null;

            return GenerateJwtToken(member.MemberId.ToString(), member.Email, "User", "Customer");
        }

        public async Task<string?> LoginByUserNameAsync(UserDto user)
        {
            var staff = await _staffService.GetStaffDetail(user!.UserName!);
            if (staff == null) return null;

            //Check Password
            var passwordValid = BCrypt.Net.BCrypt.Verify(user.PasswordHash, staff.Password);
            if (!passwordValid) return null;

            var role = staff.StaffRoles.FirstOrDefault();
            if(role == null) return null;
            
            return GenerateJwtToken(staff.Id.ToString(), staff.UserName, role.RoleCode, role.RoleName);
        }

        public async Task<string?> RegisterAsync(CustomerDto customer)
        {
            var cust = await _customerService.GetCurrentCustomer("1");
            if(!cust.IsAnonymous) return null ;

            var member = await _customerService.GetMemberAsync(customer.Email!);
            if (member != null) return "Member Is Exists";

            string PasswordHash = BCrypt.Net.BCrypt.HashPassword(customer.PasswordHash);
            
            var newMember = new Member
            {
              Email = customer.Email!,
              Username = customer.UserName!,
              Password = PasswordHash,
              MemberId = "",
              Customer = cust,
              CustomerId = cust.CustomerId,
              FirstName = customer.FirstName,
              LastName = customer.LastName!,
              DateOfBirth = customer.DateOfBirth,
              LoginDateTime = DateTime.Now,
              LogoutDateTime = DateTime.Now,
            };

            await _memberRepository.AddAsync(newMember);
            
            await _memberRepository.SaveChangesAsync();
            
            return $"{string.Concat("Member ", newMember.Username, " Add Successful.")}";
        }

        private string GenerateJwtToken(string userId, string userName, string role, string userType)
        {
            // A. Create Claims (The data inside the token)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId), // Standard ID claim
                new Claim(ClaimTypes.Name, userName),         // Standard Name claim
                new Claim(ClaimTypes.Role, role),             // Standard Role claim
                new Claim("UserType", userType)               // Custom claim (Staff vs Customer)
            };

            // B. Get Key from Config
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]!));

            // C. Create Credentials (Sign the token)
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // D. Define Token Descriptor
            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:DurationInMinutes"])),
                signingCredentials: creds
            );

            // E. Write Token to String
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}