using System.Reflection;
using System.Web.Mvc;

namespace Mvc7S
{
    public class AjaxActionAttribute : ActionMethodSelectorAttribute
    {
        public override bool IsValidForRequest(ControllerContext controllerContext, MethodInfo methodInfo)
        {
            return (controllerContext != null && controllerContext.HttpContext.Request.IsAjaxRequest());
        }
    }
}