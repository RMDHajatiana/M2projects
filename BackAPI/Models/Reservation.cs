﻿using System.ComponentModel.DataAnnotations.Schema;
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
        public int VolID { get; set; }
        public Vol? Vol { get; set; }

        [Column("id_classe")]
        public int ClasseServiceID { get; set; }
        public ClasseService? ClasseService { get; set; }

        [Column("remboursement")]
        public double Remboursement { get; set; }


        [Column("id_passager")]
        public int PassagerID { get; set; }
        public Passager? Passager { get; set; }

        [Column("date_reservation")]
        public DateOnly Date_reservation { get; set; }

        [Column("prix")]

        public double Prix { get; set; }

        
        [NotMapped]
        public double Devise { get; set; }
 

    }
}
