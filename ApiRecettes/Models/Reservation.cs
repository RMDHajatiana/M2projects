using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recettes.Models
{

    [Table("reservation")]
    public class Reservation
    {

        [Key]
        [Column("num_reservation")]
        public int Num_reservation { get; set; }

        [Column("num_vol")]
        public int Num_vol { get; set; }
        public Vol? Vol { get; set; } 

        [Column("code_tarif")]
        public int Code_tarif { get; set; }
        public Tarif? Tarif { get; set; }

        [Column("code_classe")]
        public int Code_classe { get; set; }
        public ClasseService? ClasseService { get; set; }

        [Column("id_perso")]
        public int Id_perso { get; set; }
        public Personne? Personne { get; set; }


        [Column("date_reservation")]
        public DateTime Date_reservation { get; set; }
  
    }
}
