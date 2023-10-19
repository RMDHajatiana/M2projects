using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{

    [Table("passager")]
    public class Passager
    {
        [Key]
        [Column("id_passager")]
        public int Id_passager { get; set; }

        [Column("nom_passager")]
        [StringLength(50)]

        public string? Nom_passager { get; set; }

        [Column("prenom_passager")]
        [StringLength(50)]
        public string? Prenom_passager { get; set; }

        [Column("phone_passager")]
        [StringLength(10)]

        public string? Phone_passager { get; set; }

        [Column("email_passager")]
        [StringLength(50)]
        public string? Email_passager { get; set; }

        [Column("num_passeport")]
        [StringLength(9)]
        public string? Num_passeport { get; set; }

        [Column("adresse_passager")]
        [StringLength(25)]
        public string? Adresse_passager { get; set; }
    }
}
