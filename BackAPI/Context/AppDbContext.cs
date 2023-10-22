using BackAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Appartenir> Appartenir { get; set; } 
        public DbSet<Avion> Avion { get; set; } 
        public DbSet<Itineraire> Itineraire { get; set; }
        public DbSet<ClasseService> ClasseService { get; set; } 
        public DbSet<Passager> Passager { get; set; } 
        public DbSet<Reservation> Reservation { get; set; } 
        public DbSet<Vol> Vol { get; set; } 
        public DbSet<Tarif> Tarif { get; set; } 
        public DbSet<Utulisateur> Utulisateur { get; set; }


/*        protected override void OnModelCreating(ModelBuilder modelBuilder)

        {
            modelBuilder.Entity<Reservation>().HasOne(r => r.ClasseService).WithMany().HasForeignKey(r => r.Id_classe);

            modelBuilder.Entity<Reservation>().HasOne(r => r.Vol).WithMany().HasForeignKey(r => r.Id_vol);

            modelBuilder.Entity<Reservation>().HasOne(r => r.Passager).WithMany().HasForeignKey(r => r.Id_passager);

*//*            modelBuilder.Entity<Vol>().HasOne(r => r.Avion).WithMany().HasForeignKey(r => r.Id_aeronef);

            modelBuilder.Entity<Vol>().HasOne(r => r.Itineraire).WithMany().HasForeignKey(r => r.Id_itineraire);*//*

            modelBuilder.Entity<Appartenir>().HasOne(r => r.ClasseService).WithMany().HasForeignKey(r => r.Id_classe);

            modelBuilder.Entity<Appartenir>().HasOne(r => r.Avion).WithMany().HasForeignKey(r => r.Id_aeronef);

            modelBuilder.Entity<Tarif>().HasOne(r => r.ClasseService).WithMany().HasForeignKey(r => r.Id_classe);

            modelBuilder.Entity<Tarif>().HasOne(r => r.Vol).WithMany().HasForeignKey(r => r.Id_vol);

        }*/


    }


}