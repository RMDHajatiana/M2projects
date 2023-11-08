using BackAPI.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackAPI.Models;

namespace BackAPI.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class OperationController : ControllerBase

    {
        private readonly AppDbContext _context;

        public OperationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("/Operation")]
        public IActionResult CalculerRecetteGlobale()

        {
            double recetteGlobale = 0;

            var vols = _context.Vol.Include(t=>t.Tarifs).ToList();

            foreach (var vol in vols)

            {
                double montantTotalVol = 0;

                foreach (var tarif in vol.Tarifs)
                {
                var reservations = _context.Reservation
                    .Where(r => r.VolID == vol.Id_vol && r.ClasseServiceID == tarif.ClasseServiceID)
                    .ToList();
                    
                montantTotalVol += tarif.Montant_tarif * reservations.Count() ;

                }

                recetteGlobale += montantTotalVol;
            }

            return Ok( new { recetteGlobale });
        }

        [HttpGet("/operation/future")]
        public IActionResult CalculerRecetteFuture()
        {
            double recetteFuture = 0;


            var dateActuelle = DateTime.Now;
            var volsAVenir = _context.Vol
                .AsEnumerable()
                .Where(v => v.Date_depart.Year > dateActuelle.Year ||
                            (v.Date_depart.Year == dateActuelle.Year && v.Date_depart.DayOfYear >= dateActuelle.DayOfYear))
                .ToList();

                    foreach (var vol in volsAVenir)
                    {

                    var montantRecetteFutureVol = _context.Reservation
                    .Where(r => r.VolID == vol.Id_vol && r.Date_reservation.Year > dateActuelle.Year ||
                                (r.Date_reservation.Year == dateActuelle.Year && r.Date_reservation.DayOfYear >= dateActuelle.DayOfYear))
                    .Sum(r => r.Prix);


                     //  prendre en compte les passagers à l'heure

                    var facteurCorrection = 0.95; // 95% de passagers à l'heure

                    montantRecetteFutureVol *= facteurCorrection;

                    recetteFuture += montantRecetteFutureVol;
                }


            return Ok(new { recetteFuture });
        }


    }

}









/*public double CalculerRecetteGlobaleParGroupe(DateOnly date)
{
    double recetteGlobale = 0;

    var vols = _context.Vol.Include(v => v.Tarifs).ToList();

    foreach (var vol in vols)
    {
        // Utilisation de jointures pour récupérer les tarifs, les réservations et les passagers associés au vol
        var recettesVol = _context.Tarif
            .Where(t => t.VolID == vol.Id_vol)
            .Join(_context.Reservation,
                tarif => tarif.ClasseServiceID,
                reservation => reservation.ClasseServiceID,
                (tarif, reservation) => new { Tarif = tarif, Reservation = reservation })
            .Join(_context.Passager,
                tr => tr.Reservation.PassagerID,
                passager => passager.Id_passager,
                (tr, passager) => new { TarifReservation = tr, Passager = passager })
            .Where(trp => trp.TarifReservation.Reservation.Date_reservation == date)
            .GroupBy(trp => new { trp.TarifReservation.Tarif.Id_tarif, trp.TarifReservation.Reservation.Num_reservation })
            .Select(group => group.Sum(trp => trp.TarifReservation.Tarif.Montant_tarif))
            .Sum();

        recetteGlobale += recettesVol;
    }
    return recetteGlobale;
}*/