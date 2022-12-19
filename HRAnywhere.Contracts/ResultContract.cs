using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace HRAnywhere.Contracts
{
    [DataContract]
    public class ResultContract
    {
        [DataMember]
        public bool WasSuccessful { get; set; }
        [DataMember]
        public object Result { get; set; }
        [DataMember]
        public string Message { get; set; }
    }
}
