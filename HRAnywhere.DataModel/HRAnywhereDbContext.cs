using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HRAnywhere.Model;

namespace HRAnywhere.DataModel
{
    public class HRAnywhereDbContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public DbSet<Member> Members { get; set; }

        public HRAnywhereDbContext()
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
