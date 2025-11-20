using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurant.System.Models.Dtos.Sharable
{
    public class ApplicationDto : UserDto
    {
        public required string FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<AddressDto>? Address { get; set; }
    }
}