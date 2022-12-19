using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRAnywhere.DataModel
{
    public sealed class UnitOfWork : IDisposable
    {
        private readonly HRAnywhereDbContext _dbContext;
        private MemberRepository _memberRepository;
        private CompanyRepository _companyRepository;

        public UnitOfWork()
        {
            _dbContext = new HRAnywhereDbContext();
        }

        public MemberRepository MemberRep
        {
            get { return (_memberRepository = _memberRepository ?? new MemberRepository(_dbContext)); }
        }

        public CompanyRepository CompanyRep
        {
            get { return (_companyRepository = _companyRepository ?? new CompanyRepository(_dbContext)); }
        }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
