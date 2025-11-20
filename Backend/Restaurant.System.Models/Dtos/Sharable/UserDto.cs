using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurant.System.Models.Dtos
{
    public class UserDto
    {
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public required string PasswordHash { get; set; }
    }
}