using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurant.System.Models.Dtos.Sharable
{
    public class AddressDto
    {
        public required string Address1 { get; set; }
        public string? Address2 { get; set; }
        public required string PostalCode { get; set; }
        public required string State { get; set; }
        public required string Country { get; set; }

        // public string ToAddressString(this AddressDto address)
        // {
        //     return $"{String.Concat(Address1 ," ", Address2, " ", PostalCode, " ", State, " ", Country)}";
        // }
    }
}