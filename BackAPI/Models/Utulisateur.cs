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
        public string? Nom_user { get; set; }

        [Column("prenom_user")]
        public string? Prenom_user { get; set; }

        [Column("phone_user")]
        public long Phone_user { get; set; }

        [Column("email_user")]
        public string? Email_user { get; set; }

        [Column("mdp_user")]
        public string? Mdp_user { get; set; }

        [Column("adresse_user")]
        public string? Adresse_user { get; set; }

        [Column("role_user")]
        public long Role_user { get; set; }

    }
}
