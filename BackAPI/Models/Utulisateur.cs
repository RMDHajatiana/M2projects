using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{
    [Table("utilisateur")]
    public class Utulisateur
    {
        [Key]
        [Column("num_matricule")]
        public int Num_matricule { get; set; }

        [Column("nom_user")]
        [StringLength(50)]
        public string? Nom_user { get; set; }

        [Column("prenom_user")]
        [StringLength(50)]
        public string? Prenom_user { get; set; }

        [Column("phone_user")]

        public long Phone_user { get; set; }

        [Column("email_user")]
        [StringLength(25)]
        public string? Email_user { get; set; }

        [Column("mdp_user")]
        [StringLength(20)]
        public string? Mdp_user { get; set; }

        [Column("adresse_user")]
        [StringLength(25)]
        public string? Adresse_user { get; set; }

        [Column("role_user")]
        [StringLength(25)]
        public string ? Role_user { get; set; }

    }
}
