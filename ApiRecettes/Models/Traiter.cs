using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table("traiter")]
    public class Traiter
    {
        [Key]
        [Column("code_tarif")]
        public int Code_tarif { get; set; }
        public Tarif? Tarif { get; set; }

        [Column("id_perso")]
        public int Id_perso { get; set; }
        public Personne? Personne { get; set; }

        [Column("date_traitement")]
        public DateTime Date_traitement { get; set; }

        [Column("recettes")]
        public double Recettes { get; set; }
    }
}
