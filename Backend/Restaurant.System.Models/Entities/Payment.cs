namespace Restaurant.System.Models;

public class Payment
{
    public int Id { get; set; }
    public required string TransactionCode { get; set; }
    public required string PaymentMethod { get; set; }
    public required string PaymentReferenceNumber { get; set; }
    public required string PaymentStatus { get; set; }
    public decimal PaymentAmount { get; set; }
    public string? PaymentMessage { get; set; }
    public DateTime PaymentDateTime { get; set; }
}