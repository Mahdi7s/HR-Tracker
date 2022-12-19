using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Mvc;

namespace Mvc7S
{
    public abstract class Bootstrapper : IDependencyResolver
    {
        public void Run()
        {
            Configure();
            DependencyResolver.SetResolver(this);
        }

        //-------------------------------------------------------------

        protected virtual void Configure() { }

        protected virtual IEnumerable<Assembly> SelectAssemblies()
        {
            return new Assembly[] { Assembly.GetCallingAssembly() };
        }

        public virtual void BuildUp(object instance) { }

        public virtual object GetService(Type serviceType)
        {
            return Activator.CreateInstance(serviceType);
        }

        public virtual IEnumerable<object> GetServices(Type serviceType)
        {
            return new object[] { Activator.CreateInstance(serviceType) };
        }
    }
}