using System;
using System.Web.Security;
using HRAnywhere.DataModel;

namespace HRAnywhere.Server.Web.Membership
{
    public sealed class UserRoleProvider : RoleProvider
    {
        #region No Usage

        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        #endregion

        public override string[] GetRolesForUser(string username)
        {
            if (string.IsNullOrEmpty(username))
                throw new ArgumentNullException("username");

            if (username.Equals("Anonymous"))
                return new[] { "Anonymous" };

            using (var uof = new UnitOfWork())
            {
                var user = uof.MemberRep.GetByUserName(username);
                if (user != null)
                {
                    return new[] { user.Role.ToString() };
                }
            }
            return new[] { "" };
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            if (string.IsNullOrEmpty(username))
                throw new ArgumentNullException("username");
            if (string.IsNullOrEmpty(roleName))
                throw new ArgumentNullException("roleName");

            if (username.Equals("Anonymous") && roleName.Equals("Anonymous"))
                return true;

            using (var uof = new UnitOfWork())
            {
                var user = uof.MemberRep.GetByUserName(username);
                return (user != null && user.IsInRole(roleName));
            }                        
        }
    }
}