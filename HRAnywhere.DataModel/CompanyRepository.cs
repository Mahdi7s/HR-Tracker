using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HRAnywhere.Model;
using Mvc7S;

namespace HRAnywhere.DataModel
{
    public class CompanyRepository : Repository<Company>
    {
        public CompanyRepository(HRAnywhereDbContext dbContext) : base(dbContext)
        {
        }
    }
}
