namespace webapi.Model
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Display(Name = "Staff Profile")]
    public partial class Staff
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public int StaffTypeId { get; set; }

        public byte[] Photo { get; set; }

        public string MimeType { get; set; }

        [Required]
        [Display(Name = "ID Type")]
        public int IdType { get; set; }

        [Required]
        [StringLength(20)]
        [Display(Name = "ID Number")]
        public string IdNumber { get; set; }

        [Display(Name = "ID Expiry Date")]
        public DateTime? IdExpiryDate { get; set; }

        [Required]
        [StringLength(100)]
        [Display(Name = "Staff Name")]
        public string StaffName { get; set; }

        [Required]
        [Display(Name = "Status")]
        public int StaffStatus { get; set; }

        [Required]
        [Display(Name = "Residency Type")]
        public int ResidencyType { get; set; }

        [Required]
        [Display(Name = "Home Office")]
        public int HomeOffice { get; set; }

        public int Sex { get; set; }

        public int? DepartmentId { get; set; }

        [StringLength(100)]
        [Display(Name = "Designation")]
        public string Designation { get; set; }

        [StringLength(30)]
        public string PassNumber { get; set; }

        [StringLength(20)]
        [Display(Name = "Employee ID")]
        public string EmployeeID { get; set; }

        [Display(Name = "Start Date")]
        public DateTime StartDate { get; set; }

        [Display(Name = "End Date")]
        public DateTime? EndDate { get; set; }

        [Required]
        [StringLength(50)]
        [Phone]
        [Display(Name = "Mobile Number")]
        public string MobileNumber { get; set; }

        [Required]
        [StringLength(255)]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(2000)]
        public string Remarks { get; set; }

        [Display(Name = "Enrolled Authentication")]
        public EnrolledAuthenticationObj[] EnrolledAuthentication { get; set; }

        [NotMapped]
        public class EnrolledAuthenticationObj
        {
            public bool Enrolled { get; set; }
        }

        public bool Shared { get; set; } = false;

        public DateTime CreatedOn { get; set; }

        public Guid CreatedBy { get; set; }

        public DateTime ModifiedOn { get; set; }

        public Guid ModifiedBy { get; set; }

        [StringLength(50)]
        public string ReferenceId { get; set; }


    }
}
