using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using HRAnywhere.Utilities;

namespace HRAnywhere.Model
{
    [DataContract]
    public class Member
    {
        public Member()
        {
            IsOnline = false;
        }

        [DataMember]
        public int MemberId { get; set; }

        [DataMember]
        public int CompanyId { get; set; }

        [DataMember]
        public string FirstName { get; set; }

        [DataMember]
        public string LastName { get; set; }

        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public bool IsOnline { get; set; }
        [DataMember]
        public string Role { get; set; }
        [DataMember]
        public virtual Company Company { get; set; }

        [NotMapped]
        public RoleKind RoleEnum
        {
            get
            {
                RoleKind ret = RoleKind.None;
                Enum.TryParse(Role, out ret);
                return ret;
            }
            set
            {
                Role = value.ToString();
            }
        }

        [NotMapped]
        public RoleAccess RoleAccess 
        { 
            get { var retval = RoleAccess.None;
                switch (this.RoleEnum)
                {
                        case RoleKind.Registered:
                        retval = RoleAccess.None;
                        break;
                        case RoleKind.User:
                        retval = RoleAccess.ViewingApplications;
                        break;
                        case RoleKind.Admin:
                        retval = RoleAccess.ViewingApplications | RoleAccess.AddingMembers;
                        break;
                }
                return retval;
            }    
        }

        public bool IsInRole(string role)
        {
            if(string.IsNullOrEmpty(role))
                throw new ArgumentNullException("role");

            return role.Equals(Role, StringComparison.OrdinalIgnoreCase);
        }

        public bool IsPasswordEqualsTo(string plainPassword)
        {
            return Password.Equals(plainPassword.ToSha());
        }
    }
}
