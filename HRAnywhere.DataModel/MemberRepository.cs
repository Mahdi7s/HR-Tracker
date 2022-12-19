using System;
using System.Linq;
using HRAnywhere.Model;
using HRAnywhere.Utilities;
using Mvc7S;

namespace HRAnywhere.DataModel
{
    public class MemberRepository : Repository<Member>
    {
        public MemberRepository(HRAnywhereDbContext dbContext) : base(dbContext)
        {
        }

        public Member GetByUserName(string username)
        {
            if(string.IsNullOrEmpty(username))
                throw new ArgumentNullException("username");

            return _dbSet.FirstOrDefault(x => x.UserName.Equals(username, StringComparison.OrdinalIgnoreCase));
        }

        public override void Insert(Member entity)
        {
            if (!_dbSet.Any(x => x.UserName.Equals(entity.UserName, StringComparison.OrdinalIgnoreCase)))
            {
                entity.Password = entity.Password.ToSha();
                base.Insert(entity);
            }
            else throw new Exception("این نام کاربری قبلا ثبت شده است.");
        }

        public bool IsInRole(string username, string roleName)
        {
            var mem = GetByUserName(username);
            return (mem != null && mem.Role.Equals(roleName, StringComparison.OrdinalIgnoreCase));
        }
    }
}