using System;
using System.Web.Security;
using HRAnywhere.Client.Web.HRAnywhereServiceReference;
using HRAnywhere.Client.Web.Utils;

namespace HRAnywhere.Client.Web.Membership
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

                var proxy = Helpers.NewServiceProxy(false);
                proxy.ClientCredentials.UserName.UserName = username;
                proxy.ClientCredentials.UserName.Password = Helpers.Password;

                return proxy.GetRolesForUser(username);
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            if (string.IsNullOrEmpty(username))
                throw new ArgumentNullException("username");
            if (string.IsNullOrEmpty(roleName))
                throw new ArgumentNullException("roleName");

                var proxy = Helpers.NewServiceProxy(false);
                proxy.ClientCredentials.UserName.UserName = username;
                proxy.ClientCredentials.UserName.Password = Helpers.Password;

                return proxy.IsUserInRole(username, roleName);                         
        }
    }
}