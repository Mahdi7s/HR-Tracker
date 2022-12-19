using System;
using System.Diagnostics;
using System.Linq;
using System.Security.Permissions;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Web;
using HRAnywhere.Contracts;
using HRAnywhere.DataModel;
using HRAnywhere.Model;
using HRAnywhere.Utilities;
using System.Threading;

namespace HRAnywhere.Services
{    
    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple, InstanceContextMode = InstanceContextMode.PerCall, IncludeExceptionDetailInFaults = true)]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class HRAnywhereService : IHRAnywhereService
    {
        public HRAnywhereService()
        {
            Thread.CurrentPrincipal = HttpContext.Current.User;
        }

        private Company GetCompany(UnitOfWork unitOfWork)
        {
            var adminUserName = ServiceSecurityContext.Current.PrimaryIdentity.Name;
            if(string.IsNullOrEmpty(adminUserName))
                throw new ArgumentNullException("adminUserName");
            var admin = unitOfWork.MemberRep.GetByUserName(adminUserName);
            if(admin != null)
            return admin.Company;
            return null;
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true, Role = "Admin")]
        public IQueryable<Member> GetMembers(Func<Member, bool> filter = null)
        {
            using (var uof = new UnitOfWork())
            {
                var company = GetCompany(uof);
                if(company != null)
                {
                    var where = filter ?? (x => true);
                    return company.Members.Where(where).AsQueryable();
                }
            }
            return null;
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true)]
        public Member GetMe()
        {
            var username = ServiceSecurityContext.Current.PrimaryIdentity.Name;
            using (var uof = new UnitOfWork())
            {
                var mem = uof.MemberRep.GetByUserName(username);
                return mem;
            }
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true, Role = "Admin")]
        public int InsertMember(Member member)
        {
            try
            {
                using (var uof = new UnitOfWork())
                {
                    var company = GetCompany(uof);
                    if (company != null)
                    {
                        member.RoleEnum = RoleKind.Registered;
                        member.Company = company;
                        uof.MemberRep.Insert(member);
                        uof.SaveChanges();
                        return member.MemberId;
                    }
                    throw new Exception("سرور قادر به دریافت اطلاعات شرکت شما نمی باشد.");
                }
            }
            catch (Exception ex)
            {
                throw ex.ToFault();
            }
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true, Role = "Admin")]
        public bool DeleteMember(int memberId)
        {
            using (var uof = new UnitOfWork())
            {
                var member = uof.MemberRep.GetByID(memberId);
                if(member != null)
                {
                    uof.MemberRep.DeleteEntity(member);
                    uof.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true, Role = "Admin")]
        public bool DeleteMember(string memberName)
        {
            using (var uof = new UnitOfWork())
            {
                var member = uof.MemberRep.GetByUserName(memberName);
                if(member != null)
                {
                    uof.MemberRep.DeleteEntity(member);
                    uof.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true, Role = "Admin")]
        public bool UpdateCompany(Company company)
        {
            using (var uof = new UnitOfWork())
            {
                var aCompany = GetCompany(uof);
                if (aCompany != null && aCompany.CompanyId == company.CompanyId)
                {
                    uof.CompanyRep.Attach(company);
                    uof.CompanyRep.Update(company);
                    uof.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true, Role = "Anonymous")]
        public int InsertCompany(Company company, Member admin)
        {
            try
            {
                using (var uof = new UnitOfWork())
                {
                    uof.CompanyRep.Insert(company);
                    uof.SaveChanges();
                    admin.CompanyId = company.CompanyId;
                    admin.RoleEnum = RoleKind.Admin;
                    uof.MemberRep.Insert(admin);
                    uof.SaveChanges();

                    return admin.MemberId;
                }
            }
            catch (Exception ex)
            {
                throw ex.ToFault();
            }
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true)]
        public bool UpdateMember(Member member)
        {
            using (var uof = new UnitOfWork())
            {
                var username = ServiceSecurityContext.Current.PrimaryIdentity.Name;
                if(member != null && member.UserName.Equals(username, StringComparison.OrdinalIgnoreCase))
                {
                    uof.MemberRep.Attach(member);
                    uof.MemberRep.Update(member);
                    uof.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true)]
        public void SetOnline(bool isOnline)
        {
            var username = ServiceSecurityContext.Current.PrimaryIdentity.Name;
            using (var uof = new UnitOfWork())
            {
                var mem = uof.MemberRep.GetByUserName(username);
                if (mem != null)
                {
                    mem.IsOnline = isOnline;
                    uof.MemberRep.Update(mem);
                    uof.SaveChanges();
                }
            }
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = false)]
        public bool IsUserInRole(string username, string roleName)
        {
            using (var uof = new UnitOfWork())
            {
                return uof.MemberRep.IsInRole(username, roleName);
            }
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = false)]
        public string[] GetRolesForUser(string username)
        {
            using (var uof = new UnitOfWork())
            {
                var user = uof.MemberRep.GetByUserName(username);
                if(user != null)
                    return new []{user.Role.ToString()};
            }
            return new[]{""};
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true)]
        public bool ValidateUser(string username, string password)
        {
            //using (var uof = new UnitOfWork())
            //{
            //    var mem = uof.MemberRep.GetByUserName(username);
            //    return (mem != null && mem.UserName.Equals(username, StringComparison.OrdinalIgnoreCase) &&
            //            mem.IsPasswordEqualsTo(password));
            //}
            return true;
        }

        [PrincipalPermission(SecurityAction.Demand, Authenticated = true)]
        public bool ChangePassword(string username, string oldPassword, string newPassword)
        {
            using (var uof = new UnitOfWork())
            {
                try
                {
                    var memname = ServiceSecurityContext.Current.PrimaryIdentity.Name;
                    if (!memname.Equals(username, StringComparison.OrdinalIgnoreCase))
                        throw new Exception("شما مجوز انجام این کار را ندارید.");

                    var member = uof.MemberRep.GetByUserName(username);                    
                    if (member != null && member.IsPasswordEqualsTo(oldPassword))
                    {
                        member.Password = member.Password.ToSha();
                        uof.MemberRep.Update(member);
                        uof.SaveChanges();
                        return true;
                    }
                }
                catch(Exception ex)
                {
                    throw ex.ToFault();
                }
            }
            return false;
        }
    }
}
