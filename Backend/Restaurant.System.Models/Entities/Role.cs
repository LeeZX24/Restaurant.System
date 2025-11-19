namespace Restaurant.System.Models.Entities
{
    public class Role
    {
        public int Id { get; set;}
        public required string RoleCode { get; set; }
        public required string RoleName { get; set; }
        public required List<Staff> Staffs { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}