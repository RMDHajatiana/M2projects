using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table("personne")]
    public class Personne
    {
        [Key]
        [Column("id_perso")]
        public int Id_perso { get; set; }

        [Column("nom_perso")]
        public string? Nom_perso { get; set; }

        [Column("prenom_perso")]
        public string? Prenom_perso { get; set; }

        [Column("phone_perso")]
        public long Phone_perso { get; set; }

        [Column("e_mail_perso")]
        public string? E_mail_perso { get; set; }

        [Column("adresse_perso")]
        public string? Adresse_perso { get; set; }

        [Column("num_passeport_perso")]
        public long Num_passeport_perso { get; set; }

        [Column("type_perso")]
        public string? Type_perso { get; set; }
    }
}
