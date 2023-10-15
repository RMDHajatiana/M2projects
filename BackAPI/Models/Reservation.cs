using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackAPI.Models
{

    [Table("reservation")]
    public class Reservation
    {

        [Key]
        [Column("num_reservation")]
        public int Num_reservation { get; set; }

        [Column("id_vol")]
        public int Id_vol { get; set; }
        public Vol? Vol { get; set; }

        [Column("id_classe")]
        public int Id_classe { get; set; }
        public ClasseService? ClasseService { get; set; }

        [Column("id_passager")]
        public int Id_passager { get; set; }
        public Passager? Passager { get; set; }

        [Column("date_reservation")]
        public DateTime Date_reservation { get; set; }

    }
}
