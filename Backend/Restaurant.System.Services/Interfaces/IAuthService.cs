using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Restaurant.System.Models.Dtos;

namespace Restaurant.System.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<string?> LoginByUserNameAsync(UserDto user);
        public Task<string?> LoginByEmailAsync(UserDto user);
        public Task<string?> RegisterAsync(CustomerDto customer);
    }
}