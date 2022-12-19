using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;

namespace HRAnywhere.Utilities
{
    public static class OtherExtensions
    {
        public static FaultException ToFault(this Exception ex)
        {
            var message = ex.Message;
            var inner = ex.InnerException;
            while (inner != null)
            {
                message += "\r\n" + inner.Message;
                inner = inner.InnerException;
            }
            return new FaultException(message);
        }
    }
}
