using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace HRAnywhere.Model
{
    [Flags, DataContract]
    public enum RoleKind
    {
        [EnumMember]Registered = 0, [EnumMember]User = 1, [EnumMember]Admin = 2, [EnumMember]CreatorCoAdmin = 3, [EnumMember]None = 4
    }

    [Flags, DataContract]
    public enum RoleAccess : int
    {
        [EnumMember]AddingMembers = 0, [EnumMember]ViewingApplications = 1, [EnumMember]None = 3
    }
}
