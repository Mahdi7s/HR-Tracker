using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace HRAnywhere.Model
{
    [DataContract]
    public class Company
    {
        [DataMember]
        public int CompanyId { get; set; }
        [DataMember]
        public string CompanyName { get; set; }

        public virtual List<Member> Members { get; set; } 
    }
}
