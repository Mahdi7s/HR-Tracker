using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using System.Reflection;

namespace Mvc7S
{
    public static class QueryExtensions
    {
        public static MemberInfo GetMember(this Expression expression)
        {
            var lambada = expression as LambdaExpression;

            ThrowExeception(() => lambada == null, new InvalidOperationException("can not convert expression to a lambada"));

            return (lambada.Body is MemberExpression) ? ((MemberExpression)lambada.Body).Member 
                : ((MemberExpression)(((UnaryExpression)lambada.Body).Operand)).Member;
        }

        #region Help On Help!

        private static void ThrowExeception(Func<bool> predict, Exception ex) { if (predict()) throw ex; }

        #endregion
    }
}