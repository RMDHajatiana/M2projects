using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table("traiter")]
    public class Traiter
    {
        [Key]
        [Column("num_reservation")]
        public int Num_reservation { get; set; }
        public Reservation? Reservation { get; set; }

        [Column("id_perso")]
        public int Id_perso { get; set; }
        public Personne? Personne { get; set; }

        [Column("date_traitement")]
        public DateTime Date_traitement { get; set; }

        [Column("recettes")]
        public double Recettes { get; set; }
    }
}
