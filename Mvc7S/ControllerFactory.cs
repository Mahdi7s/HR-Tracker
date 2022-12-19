using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace Mvc7S
{
    public class ControllerFactory : DefaultControllerFactory
    {
        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            var ret = IoC.Get<IController>(controllerType);
            if (ret != null) return ret;
            return base.GetControllerInstance(requestContext, controllerType);
        }
    }
}